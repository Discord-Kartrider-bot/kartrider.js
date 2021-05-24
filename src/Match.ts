//import type { rawUserMatch } from './types/raw'
export default class Match{
    public id: string;
    public _channelNameID: string;
    public _matchTypeID: string;
    public _trackID: string;
    public startTime: Date
    public endTime: Date
    public matchResult: string;
    private _playTime: number | null;
    public gameSpeed: number | null;

    constructor(data){
    this._channelNameID = data.channelName;
    this._matchTypeID = data.matchType;
    this._trackID = data.trackId;
    this.matchResult = data.matchResult;
    this.startTime = new Date(data.startTime+"Z");
    this.endTime = new Date(data.endTime+"Z");
    this._playTime = data.playTime;
    this.id = data.matchId; 
    this.gameSpeed = data.gameSpeed;
    }

    get isPartial(){
        return Boolean(this.playTime || this.gameSpeed);
    }

    get speedmod(){
        if(this._channelNameID.includes("Infinit")) return "무한";
        else if(this._channelNameID.includes("Fastest2Enchant")) return "가장빠름";
        else if(this._channelNameID.includes("Fastest")) return "매우빠름";
        else if(this._channelNameID.includes("Fast")) return "빠름";
        return null;
    }

    get playTime(){
		return this._playTime || (this.endTime.getTime()-this.startTime.getTime());
	}


}