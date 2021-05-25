import got, { Got } from 'got'
import UserMatchList from './UserMatchList';
import { StatusCodeErrorHandler } from './NexonError';
import type {rawMatchDetail, rawUserMatchList } from '../typings/raw'
import MatchDetail from './MatchDetail';

export interface UserBasicInfo{
    accessId: string;
    name: string;
    level: number;
}

export class KartClient {
    private _token: string;
    public api: Got;
    
    constructor(token:string){
        this._token = token;
        this.api = got.extend({
            prefixUrl: 'https://api.nexon.co.kr/kart/v1.0',
            headers: {
                'Authorization': this._token
            },
            responseType: 'json',
            handlers:[StatusCodeErrorHandler]
        })
        }
    
    async getUserBasicInfoByName(name:string) : Promise<UserBasicInfo | null>{
        const _name = encodeURIComponent(name);
        const res = await this.api.get(`users/nickname/${_name}`)
        if(!res) return null;
        return res.body as unknown as UserBasicInfo;
    }

    async getUserBasicInfoByID(id:string) : Promise<UserBasicInfo | null>{
        const res = await this.api.get(`users/${id}`);
        if(!res) return null;
        return res.body as unknown as UserBasicInfo;
    }

    async getUserMatchList(info:UserBasicInfo,limit:number=20,offset:number=0) : Promise<UserMatchList | null>{
        const res = await this.api.get(`users/${info.accessId}/matches`);
        if(!res) return null;
        const data = res.body as unknown as rawUserMatchList;
        return new UserMatchList(info,data,{limit,offset});
    }

    async getMatch(MatchID:string) : Promise<MatchDetail | null>{
        const res = await this.api.get(`matches/${MatchID}`);
        if(!res) return null;
        const data = res.body as unknown as rawMatchDetail;
        return new MatchDetail(data);
    }

   /* async getAllMatchList(limit){

    }*/
    }