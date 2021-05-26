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

const isOK = (body:unknown)=> body as any ['status'] !== 404

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
    
    async getUserBasicInfoByName(name:string){
        const encodeName = encodeURIComponent(name);
        const json = await this.api.get(`users/nickname/${encodeName}`).then(res=>res.body as unknown);
        return isOK(json) ? json as UserBasicInfo : null;
    }

    async getUserBasicInfoByID(id:string){
        const json = await this.api.get(`users/${id}`).then(res=>res.body as unknown);
        return isOK(json) ? json as UserBasicInfo : null;
    }

    async getUserMatchList(info:UserBasicInfo,limit:number=20,offset:number=0){
        const json = await this.api.get(`users/${info.accessId}/matches`).then(res=>res.body as unknown);
        if (!isOK(json)) return null;
        const data = json as rawUserMatchList;
        return new UserMatchList(info,data,{limit,offset});
    }

    async getMatch(MatchID:string){
        const json = await this.api.get(`matches/${MatchID}`).then(res=>res.body as unknown);
        if (!isOK(json)) return null;
        const data = json as rawMatchDetail;
        return new MatchDetail(data);
    }

   /* async getAllMatchList(limit){

    }*/
    }