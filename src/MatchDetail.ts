import type { Client } from './Client';
import { Player } from './Player';
import type { Teams, rawMatchDetail } from './types'
import { Match } from './Match';

export class MatchDetail extends Match{
    private _playTime: number;
    public _gameSpeed: number;
    public teams: Teams[] | undefined;
    public players: Player[] | undefined;

    constructor(client: Client,data: rawMatchDetail){
    super(client,data);
    this._playTime = data.playTime;
    this._gameSpeed = data.gameSpeed;
    if(data.players) 
        this.players = data.players
        .map(data=> new Player(client,data))
            .sort((a,b)=>{
                const ARank = a.matchRank || 99
                const BRank = b.matchRank || 99
                return ARank-BRank
            })
    if(data.teams)
        this.teams = data.teams.map(data=> {
        const players = data.players.map((playerData)=>new Player(client,playerData,data.teamId))
        return {teamID: data.teamId,players}
        }).sort((a,b)=> Number(a.teamID) - Number(b.teamID))
    }

    get isTeam(){
        return Boolean(this.matchResult !== "0")
    }

    get winner(){
        if(this.matchResult == "0") return this.players?.[0];
        else{
            const team = this.teams?.find(team => team.teamID === this.matchResult)
            return team || {teamID:this.matchResult}
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