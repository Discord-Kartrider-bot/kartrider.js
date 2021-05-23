import got, { Got } from 'got'
import UserMatchList from './UserMatchList';

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
            responseType: 'json'
        });
        }
    async getIDByName(name:string){
        const _name = encodeURIComponent(name);
        const res = await this.api.get(`users/nickname/${_name}`)
        return res.body as unknown as UserBasicInfo;
    }
    async getNameByID(id:string){
        const res = await this.api.get(`users/${id}`)
        return res.body as unknown as UserBasicInfo;
    }
    async getUserMatchList(info:UserBasicInfo,limit:number=20,offset:number=0){
        const res = await this.api.get(`users/${info.accessId}/matches`)
        return new UserMatchList(info,res.body,{limit,offset});
    }
    async getMatchInfo(MatchID:string){
        const res = await this.api.get(`matches/${MatchID}`);

    }
    async getMatchList(limit){

    }
    }