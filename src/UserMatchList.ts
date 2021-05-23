
import Match from './Match'; 
import { UserBasicInfo } from './KartClient'

export default class UserMatchList{
    public user: UserBasicInfo;
    public MatchList: Match[];
    public limit: number | null;
    public offset: number | null;
    constructor(userInfo:UserBasicInfo, data, {limit,offset}){
        this.user = userInfo;
        this.MatchList = resolveMatchList(data.matches);
        this.limit = limit;
        this.offset = offset;
    }
    
}

function _MargeTypefromMatchObject(data){
    let result = [];
    data.forEach(e => result = result.concat(e.matches));
    return result;
}
function _SortDatefromMatchObject(data){
    return data.sort((a,b)=>Date.parse(b.endTime)-Date.parse(a.endTime));
}
function resolveMatchList(raw): Match[]{
    const marge = _MargeTypefromMatchObject(raw);
    const sort = _SortDatefromMatchObject(marge);
    return sort.map(MatchData => new Match(MatchData));
}