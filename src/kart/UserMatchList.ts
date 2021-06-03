
import UserMatchInfo from './UserMatchInfo'; 
import type { UserBasicInfo, rawMatchTypeMatches, rawUserMatchInfo, rawUserMatchList } from '../types'
import type { KartMetaData } from '../metadata/KartMetaData';

export default class UserMatchList{
    public user: UserBasicInfo;
    public matchList: UserMatchInfo[];
    public limit: number | undefined | null;
    public offset: number | undefined | null;
    constructor(userInfo:UserBasicInfo, data: rawUserMatchList, page?:{limit:number,offset:number},kartMetaData?:KartMetaData){
        this.user = userInfo;
        this.matchList = resolveMatchList(data.matches,kartMetaData);
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

function resolveMatchList(raw: rawMatchTypeMatches[],kartMetaData?:KartMetaData){
    const marge = _MargeTypefromMatchObject(raw);
    const sort = _SortDatefromMatchList(marge);
    return sort.map(MatchData => new UserMatchInfo(MatchData,kartMetaData));
}