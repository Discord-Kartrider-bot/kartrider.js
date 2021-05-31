import type { rawMatch } from '../../typings/raw'
export default class Match{
    public id: string;
    public _channelNameID: string;
    public _matchTypeID: string;
    public _trackID: string;
    public startTime: Date
    public endTime: Date
    public matchResult: string;

    constructor(data: rawMatch){
    this._channelNameID = data.channelName;
    this._matchTypeID = data.matchType;
    this._trackID = data.trackId;
    this.matchResult = data.matchResult;
    this.startTime = new Date(data.startTime+"Z");
    this.endTime = new Date(data.endTime+"Z");
    this.id = data.matchId; 
    }


    get speedmod(){
        if(this._channelNameID.includes("Infinit")) return "무한";
        else if(this._channelNameID.includes("Fastest2Enchant")) return "가장빠름";
        else if(this._channelNameID.includes("Fastest")) return "매우빠름";
        else if(this._channelNameID.includes("Fast")) return "빠름";
        return "보통";
    }

    get playTime(){
		return (this.endTime.getTime()-this.startTime.getTime());
	}


}