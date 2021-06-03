import got from 'got'
import {Parse as parseZip} from 'unzipper'
import {parser as JSONParse}  from 'stream-json/Parser';
import {streamArray as JSONArrayStream}  from 'stream-json/streamers/StreamArray';
import {createReadStream, readdirSync, writeFile} from 'fs';
import type { Readable } from 'stream';
import type {MetaDataInfo} from '../../typings/'
import * as path from 'path';

const MetaDataDownloadURL = "https://static.api.nexon.co.kr/kart/latest/metadata.zip"
interface MetadataID{
type: string,
hash: string
}
interface fileMetaData{
    type: string,
    path: string
}
interface StreamMetaData{
    type: string,
    stream: Readable
}
export class KartMetaData {
public data: any;
public path: string|undefined;

constructor() {
    this.data = {};
}

static async init(folderPath?:string){
const kartMetaData = new KartMetaData();
if(folderPath){
    kartMetaData.path = folderPath;
    const jsonFiles = readdirSync(folderPath)
        .filter(file =>file.endsWith('.json'))
        .map(file => ({type:file.split('.')[0],path:path.join(folderPath,file)}))
        .map(fileMetaData => kartMetaData.appendJSONfile(fileMetaData))
    if(jsonFiles.length <= 0){
        console.warn('[KartMetaData] json files not found. Fetching MetaData..')
        await kartMetaData.fetch();
        console.log('[KartMetaData] save json from Fetch MetaData..')
        await kartMetaData.saveFile();
    }else await Promise.all(jsonFiles);
}else{
    console.warn('[KartMetaData] folderPath not given. Fetching MetaData..')
    await kartMetaData.fetch();
}
return kartMetaData;
}

static getRecentDataInfo(){
    return got.head(MetaDataDownloadURL).then(res=>{
        const sha256 = res.headers["x-amz-meta-sha256"];
        const modifiedDateFromS3 = res.headers["x-amz-meta-s3b-last-modified"];
        const modifiedDate = res.headers["last-modified"];
        const etag = res.headers["etag"];
        return {sha256,etag,modifiedDate,modifiedDateFromS3}
    })
}

getMetaData(id:MetadataID){
    if(!this.isExist(id)) return {id:id.hash} as MetaDataInfo
    const name = this.data[id.type].get(id.hash);
    return {id:id.hash,name} as MetaDataInfo
}

isExist(id :MetadataID){
   return Boolean(this.data[id.type] && this.data[id.type].has(id.hash));
}

fetch(){
return got.stream(MetaDataDownloadURL).pipe(parseZip())
    .on('entry', async (entry)=> {
        if(!entry.path.endsWith('.json')){entry.autodrain(); return;}
        const type = entry.path.split('.')[0];
        const streamMetadata= {type,stream:entry};
        await this.appendJSONStream(streamMetadata);
    }).promise();
}

async appendJSONfile(file:fileMetaData) {
    const stream = createReadStream(file.path);
    return _makeMapFromJSONFileStream(stream)
        .then(map => this._updateDataMap(file.type,map));
}

async appendJSONStream(stream:StreamMetaData) {
    return _makeMapFromJSONFileStream(stream.stream)
           .then(map => this._updateDataMap(stream.type,map));
}

saveFile(){
    if(!this.path) new Error(`KartMetadata Folder is undefined`);
    const names = Object.keys(this.data);
    const promiseQueue = names.map(name=>new Promise<void>((resolve,reject) =>{
        const map = this.data[name];
        const array = []
        for (let [key, value] of map) array.push({id:key,name:value})
        writeFile(path.join(this.path as string,`${name}.json`),JSON.stringify(array),(err)=>err ? reject(err) : resolve())
    }))
    return Promise.all(promiseQueue);
}

_updateDataMap(type: string,map: Map<string,string>){
    const dataMap = this.data[type];
    this.data[type] = dataMap ? new Map([...dataMap, ...map]): map;
}
}

function _makeMapFromJSONFileStream(stream:Readable){
    const map = new Map<string,string>()
    return new Promise<Map<string,string>>((resolve,_reject) => 
        stream.pipe(JSONParse()).pipe(JSONArrayStream())
            .on('data',({value:jsonData})=>map.set(jsonData.id,jsonData.name))
            .on('end',()=>resolve(map))
        )
}