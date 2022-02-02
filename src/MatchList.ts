import {MatchInfo} from './MatchInfo'; 
import type {Client} from './Client';
import type { PlayerBasicInfo, rawMatchTypeMatches, rawUserMatchInfo, rawUserMatchList } from './types'

export class MatchList{
    public user: PlayerBasicInfo;
    public matchList: MatchInfo[];
    public limit: number | undefined | null;
    public offset: number | undefined | null;
    constructor(client: Client,userInfo:PlayerBasicInfo, data: rawUserMatchList, page?:{limit:number,offset:number}){
        this.user = userInfo;
        if(!this.user.name) this.user.name = data.nickName;
        this.matchList = resolveMatchList(client,data.matches);
        this.limit = page?.limit;
        this.offset = page?.offset;
    }
}

function _MargeTypefromMatchObject(data: rawMatchTypeMatches[]){
    let result: rawUserMatchInfo[] = [];
    data.forEach(e => result = result.concat(e.matches));
    return result;
}

function _SortDatefromMatchList(data: rawUserMatchInfo[]){
    return data.sort((a,b)=>Date.parse(b.endTime)-Date.parse(a.endTime));
}

function resolveMatchList(client: Client, raw: rawMatchTypeMatches[]){
    const marge = _MargeTypefromMatchObject(raw);
    const sort = _SortDatefromMatchList(marge);
    return sort.map(MatchData => new MatchInfo(client,MatchData));
}