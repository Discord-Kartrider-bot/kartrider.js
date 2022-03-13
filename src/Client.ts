import got, { Got } from 'got'
import {MatchList} from './MatchList';
import { StatusCodeErrorHandler } from './NexonError';
import type {PlayerBasicInfo, rawMatchDetail, rawUserMatchList } from './types'
import {MatchDetail} from './MatchDetail';
import {MetaData} from './MetaData';

const isOK = (body:any)=> body.status !== 404

export class Client {
    private _token: string;
    public api: Got;
    public metadata: MetaData | undefined;
    
    constructor(token:string,options?:{metaData:{folderPath:string}}){
        this._token = token;
        this.api = got.extend({
            prefixUrl: 'https://api.nexon.co.kr/kart/v1.0',
            headers: {
                'Authorization': this._token
            },
            responseType: 'json',
            handlers:[StatusCodeErrorHandler]
        })
        if(options?.metaData?.folderPath){
            MetaData.init(options.metaData.folderPath).then(data => this.metadata = data);
        }else{
            console.warn("Can't find options.metaData.folderPath! Client.MetaData is now undefined")
        }
        }
    
    async getUserBasicInfoByName(name:string){
        const encodeName = encodeURIComponent(name);
        const json = await this.api.get(`users/nickname/${encodeName}`).then(res=>res.body as unknown);
        return isOK(json) ? json as PlayerBasicInfo : null;
    }

    async getUserBasicInfoByID(id:string){
        const json = await this.api.get(`users/${id}`).then(res=>res.body as unknown);
        return isOK(json) ? json as PlayerBasicInfo : null;
    }

    async getMatchList(info:PlayerBasicInfo,limit:number=20,offset:number=0){
        const searchParams = new URLSearchParams([['limit',limit.toString()],["offset",offset.toString()]])
        const json = await this.api.get(`users/${info.accessId}/matches`,{searchParams}).then(res=>res.body as unknown);
        if (!isOK(json)) return null;
        const data = json as rawUserMatchList;
        return new MatchList(this,info,data,{limit,offset});
    }

    async getMatch(MatchID:string){
        const json = await this.api.get(`matches/${MatchID}`).then(res=>res.body as unknown);
        if (!isOK(json)) return null;
        const data = json as rawMatchDetail;
        return new MatchDetail(this,data);
    }
    }