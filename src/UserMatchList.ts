
import UserMatchInfo from './UserMatchInfo'; 
import type { UserBasicInfo } from './KartClient'
import type { rawMatchTypeMatches, rawUserMatchInfo, rawUserMatchList } from '../typings/raw'

export default class UserMatchList{
    public user: UserBasicInfo;
    public matchList: UserMatchInfo[];
    public limit: number | undefined;
    public offset: number | undefined;
    constructor(userInfo:UserBasicInfo, data: rawUserMatchList, page?:{limit:number,offset:number}){
        this.user = userInfo;
        this.matchList = resolveMatchList(data.matches);
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

function resolveMatchList(raw: rawMatchTypeMatches[]){
    const marge = _MargeTypefromMatchObject(raw);
    const sort = _SortDatefromMatchList(marge);
    return sort.map(MatchData => new UserMatchInfo(MatchData));
}