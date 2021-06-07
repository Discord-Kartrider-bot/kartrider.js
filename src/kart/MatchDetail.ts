import type { KartMetaData } from '../metadata/KartMetaData';
import Player from './Player';
import type { Teams, rawMatchDetail } from '../types'
import Match from './Match';

export default class MatchDetail extends Match{
    private _playTime: number;
    public _gameSpeed: number;
    public teams: Teams[] | undefined;
    public players: Player[] | undefined;

    constructor(data: rawMatchDetail, kartMetaData?:KartMetaData){
    super(data,kartMetaData);
    this._playTime = data.playTime;
    this._gameSpeed = data.gameSpeed;
    if(data.players) 
        this.players = data.players
        .map(data=> new Player(data,"0",kartMetaData))
            .sort((a,b)=>{
                const ARank = a.matchRank || 99
                const BRank = b.matchRank || 99
                return ARank-BRank
            })
    if(data.teams)
        this.teams = data.teams.map(data=> {
        const players = data.players.map((playerData)=>new Player(playerData,data.teamId,kartMetaData))
        return {teamID: data.teamId,players}
        })
        .sort((a,b)=> Number(a.teamID) - Number(b.teamID))
    }

    get isTeam(){
        return Boolean(this.teams)
    }

    get winner(){
        if(this.matchResult == "0") return this.players?.[0];
        else{
            return this.teams?.find(team => team.teamID === this.matchResult)
        }
    }
    
    get playTime(){
        return this._playTime;
    }
    get gameSpeed(){
        switch(this._gameSpeed){
            case 0:
                return "빠름"
            case 1:
                return "매우빠름"
            case 2:
                return "가장빠름"
            case 3:
                return "보통"
            case 4:
                return "무한"
        }
        return "보통"
    }
}