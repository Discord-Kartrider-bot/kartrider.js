const Base = require('./Base');
const Match = require('./Match');
const Util = require('./utils')
class Player extends Base{
	constructor(client,data){
		super(client);
		this.id  = data.matches ? data.matches[0].matches[0].accountNo : data.accountNo;
		this.name  = data.matches ? data.nickName : data.characterName;
		if(data.matches){
		const match = data.matches[0].matches[0];
		this.LastMatch = new Match(this.client,match);
		const matches = Util.mergeMatchData(data.matches);
		this.matches = matches.map((m)=>{
		return new Match(this.client,m)._apply({player: new Player(this.client,m.player)})});
		this._patch(match.player);
		}else{
		this._patch(data);
		}
	}
	_patch(data){
	//renewal Lisence
	 switch(data.rankinggrade2){
        case "1": this.license = "초보";break; case "2": this.license = "루키";break;
        case "3": this.license = "L3"; break; case "4": this.license = "L2"; break;
        case "5": this.license = "L1"; break; case "6": this.license ="PRO"; break;
		default: this.license = "none"; break;
	 }

	 this.kart = Util.resolveData(data.kart,"Kart");
	 this.character = Util.resolveData(data.character,"Character");
	 this.isWin = new Boolean(data.matchWin == "1").valueOf();
	 this.rank = data.matchRank != "99"&&data.matchRank != ""? data.matchRank : null;
	 this.matchTime = data.matchTime != ""? parseInt(data.matchTime) : null;
	 if(data.pet) this.pet = Util.resolveData(data.pet,"Pet");
	 if(data.flyingPet) this.fly = Util.resolveData(data.flyingPet,"FlyingPet");
	}

	async fetchMatchDatas(limit=10){
		const data = await this.client.api.getPlayer({id:this.id},limit,true);
		const result = Util.mergeMatchData(data.matches);
		const r= await Promise.all(
			result.map( async (e)=> {
			const data = await this.client.api.getMatchInfo(e.matchId);
			return data;
			})
		);
		return r;
	}
	async fetch(limit=10){
		const data = await this.client.api.getPlayer({id:this.id},limit);
		return data;
	}
	get windata(){
	if(!this.matches) return;
	return [this.matches.map((h)=>h.player.isWin == true ? 1 : 0).reduce((a,b)=>a+b,0),this.matches.length];
	}
	async fetchwindata(limit=500){
		const data = await this.client.api.getPlayer({id:this.id},limit,true);
		const merge = Util.mergeMatchData(data.matches);
		const wins = merge.map((h)=>{
			const i = parseInt(h.matchResult);
			return i ? i : 0;
		});

		const total = wins.length;
		const win = wins.reduce((a,b)=>a+b,0);
		const rate = (win/total*100).toFixed(1)+"%";
		return {total,win,rate};
	}
}
module.exports = Player;