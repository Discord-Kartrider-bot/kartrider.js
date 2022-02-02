import type { rawMatch } from './types'
import type { MetaDataInfo } from './MetaData';
import type {Client} from './Client';
export class Match{
    public id: string;
    public channelName: string;
    public matchType: MetaDataInfo;
    public track: MetaDataInfo;
    public startTime: Date
    public endTime: Date
    public matchResult: string;

    constructor(client:Client,data: rawMatch){
    const hasMetaData = "metadata" in client;
    this.matchType =  hasMetaData ? client.metadata!.getMetaData({type:'gameType',hash:data.matchType}) : {id:data.matchType}
    this.channelName = data.channelName;
    this.track = hasMetaData ? client.metadata!.getMetaData({type:'track',hash:data.trackId}) : {id:data.trackId}
    this.matchResult = data.matchResult;
    this.startTime = new Date(data.startTime+"Z");
    this.endTime = new Date(data.endTime+"Z");
    this.id = data.matchId; 
    }


    get gameSpeed(){
        if(this.channelName.includes("Infinit")) return "무한";
        else if(this.channelName.includes("Fastest2Enchant")) return "가장빠름";
        else if(this.channelName.includes("Fastest")) return "매우빠름";
        else if(this.channelName.includes("Fast")) return "빠름";
        return "보통";
    }

    get isTeam(){
        return this.channelName.includes('Team');
    }

    get isSpecialMode(){
        return this.channelName.includes('_');
    }

    get playTime(){
		return (this.endTime.getTime()-this.startTime.getTime());
	}


}