import type { rawMatchDetail } from '../typings/raw'
import Match from './Match';
export default class MatchDetail extends Match{
    private _playTime: number;
    public gameSpeed: number;

    constructor(data: rawMatchDetail){
    super(data);
    this._playTime = data.playTime;
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
		return this._playTime;
	}


}