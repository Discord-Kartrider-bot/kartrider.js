import type { rawMatch } from '@typings/raw'
import type { MetaDataInfo } from '@typings/index'
import type {KartMetaData} from '@/metadata/KartMetaData';
export default class Match{
    public id: string;
    public channelName: string;
    public matchType: MetaDataInfo;
    public track: MetaDataInfo;
    public startTime: Date
    public endTime: Date
    public matchResult: string;

    constructor(data: rawMatch,kartMetaData?:KartMetaData){
    this.matchType = kartMetaData? kartMetaData.getMetaData({type:'gameType',hash:data.matchType}) : {id:data.matchType}
    this.channelName = data.channelName;
    this.track = kartMetaData? kartMetaData.getMetaData({type:'track',hash:data.trackId}) : {id:data.trackId}
    this.matchResult = data.matchResult;
    this.startTime = new Date(data.startTime+"Z");
    this.endTime = new Date(data.endTime+"Z");
    this.id = data.matchId; 
    }


    get speedmod(){
        if(this.channelName.includes("Infinit")) return "무한";
        else if(this.channelName.includes("Fastest2Enchant")) return "가장빠름";
        else if(this.channelName.includes("Fastest")) return "매우빠름";
        else if(this.channelName.includes("Fast")) return "빠름";
        return "보통";
    }

    get playTime(){
		return (this.endTime.getTime()-this.startTime.getTime());
	}


}