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
        const encodeName = encodeURIComponent(name);
        const json = await this.api.get(`users/nickname/${encodeName}`).then(res=>res.body as unknown);
        return (json['status'] !== 404) ? json as UserBasicInfo : null;
    }

    async getUserBasicInfoByID(id:string) : Promise<UserBasicInfo | null>{
        const json = await this.api.get(`users/${id}`).then(res=>res.body as unknown);
        return (json['status'] !== 404) ? json as UserBasicInfo : null;
    }

    async getUserMatchList(info:UserBasicInfo,limit:number=20,offset:number=0) : Promise<UserMatchList | null>{
        const json = await this.api.get(`users/${info.accessId}/matches`).then(res=>res.body as unknown);
        if (json['status'] !== 404) return null;
        const data = json as rawUserMatchList;
        return new UserMatchList(info,data,{limit,offset});
    }

    async getMatch(MatchID:string) : Promise<MatchDetail | null>{
        const json = await this.api.get(`matches/${MatchID}`).then(res=>res.body as unknown);;
        if (json['status'] !== 404) return null;
        const data = json as rawMatchDetail;
        return new MatchDetail(data);
    }

   /* async getAllMatchList(limit){

    }*/
    }