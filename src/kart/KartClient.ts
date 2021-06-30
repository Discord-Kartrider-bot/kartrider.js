import axios, { AxiosInstance } from "axios"
import UserMatchList from './UserMatchList';
import type {UserBasicInfo ,rawMatchDetail, rawUserMatchList } from '../types'
import MatchDetail from './MatchDetail';
import type {KartMetaData} from '../metadata/KartMetaData';

const isOK = (body:any)=> body.status !== 404

export class KartClient {
    private _token: string;
    public api: AxiosInstance;
    public metadata: KartMetaData | undefined;
    
    constructor(token:string,kartMetaData?:KartMetaData){
        this._token = token;
        this.api = axios.create({
            baseURL: 'https://api.nexon.co.kr/kart/v1.0',
            headers: {
                'Authorization': this._token
            },
            responseType: 'json',
            validateStatus: function (status) {
                return status < 500;
            },
        })
        this.metadata = kartMetaData;
        }
    
    async getUserBasicInfoByName(name:string){
        const encodeName = encodeURIComponent(name);
        const json = await this.api.get(`users/nickname/${encodeName}`).then(res=>res.data as unknown);
        return isOK(json) ? json as UserBasicInfo : null;
    }

    async getUserBasicInfoByID(id:string){
        const json = await this.api.get(`users/${id}`).then(res=>res.data as unknown);
        return isOK(json) ? json as UserBasicInfo : null;
    }

    async getUserMatchList(info:UserBasicInfo,limit:number=20,offset:number=0){
        const params = new URLSearchParams([['limit',limit.toString()],["offset",offset.toString()]])
        const json = await this.api.get(`users/${info.accessId}/matches`,{params}).then(res=>res.data as unknown);
        if (!isOK(json)) return null;
        const data = json as rawUserMatchList;
        return new UserMatchList(info,data,{limit,offset},this.metadata);
    }

    async getMatch(MatchID:string){
        const json = await this.api.get(`matches/${MatchID}`).then(res=>res.data as unknown);
        if (!isOK(json)) return null;
        const data = json as rawMatchDetail;
        return new MatchDetail(data,this.metadata);
    }

   /* async getAllMatchList(limit){

    }*/
    }