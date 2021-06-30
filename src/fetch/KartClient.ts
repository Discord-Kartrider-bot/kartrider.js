import UserMatchList from '../kart/UserMatchList';
import type {UserBasicInfo ,rawMatchDetail, rawUserMatchList } from '../types'
import MatchDetail from '../kart/MatchDetail';
import { fetchFromAPI } from "./HTTPHelper"
import type {KartMetaData} from '../metadata/KartMetaData';

const isOK = (body:any)=> body.status !== 404
export class KartClient {
    private token: string;
    public URLInfo: any;
    public metadata: KartMetaData | undefined;
    
    constructor(token:string,kartMetaData?:KartMetaData){
        this.token = token;
        this.metadata = kartMetaData;
        }
    
    async getUserBasicInfoByName(name:string){
        const encodeName = encodeURIComponent(name);
        const json = await fetchFromAPI(`users/nickname/${encodeName}`,{token: this.token}).then(res=>res as unknown);
        return isOK(json) ? json as UserBasicInfo : null;
    }

    async getUserBasicInfoByID(id:string){
        const json = await fetchFromAPI(`users/${id}`,{token: this.token}).then(res=>res as unknown);
        return isOK(json) ? json as UserBasicInfo : null;
    }

    async getUserMatchList(info:UserBasicInfo,limit:number=20,offset:number=0){
        const params = new URLSearchParams([['limit',limit.toString()],["offset",offset.toString()]])
        const json = await fetchFromAPI(`users/${info.accessId}/matches`,{params,token:this.token}).then(res=>res as unknown);
        if (!isOK(json)) return null;
        const data = json as rawUserMatchList;
        return new UserMatchList(info,data,{limit,offset},this.metadata);
    }

    async getMatch(MatchID:string){
        const json = await fetchFromAPI(`matches/${MatchID}`,{token:this.token}).then(res=>res as unknown);
        if (!isOK(json)) return null;
        const data = json as rawMatchDetail;
        return new MatchDetail(data,this.metadata);
    }

   /* async getAllMatchList(limit){
    }*/
    }
