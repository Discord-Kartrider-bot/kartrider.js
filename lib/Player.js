const Data = require('./Data');
const Base = require('./Base');
const Match = require('./Match');
const Util = require('./utils')
class Player extends Base{
	constructor(client,data){
		super(client);
		if(data.matches){
		const match = data.matches[0].matches[0];
		this.LastMatch = new Match(this.client,match);

		match.player.characterName = data.nickName;
		match.player.accountNo = match.accountNo;

		this._patch(match.player);
		}else{
		this._patch(data);
		}
	}
	_patch(data){
		this.id = data.accountNo;
		this.name = data.characterName;
	

	 switch(data.rankinggrade2){
        case "1": this.license = "초보";break; case "2": this.license = "루키";break;
        case "3": this.license = "L3"; break; case "4": this.license = "L2"; break;
        case "5": this.license = "L1"; break; case "6": this.license ="PRO"; break;
		default: this.license = "none"; break;
	 }

	 this.kart = Util.resolveData(data.kart,"Kart");
	 this.character = Util.resolveData(data.character,"Character");
	 if(data.pet) this.pet = Util.resolveData(data.pet,"Pet");
	 if(data.flyingPet) this.fly = Util.resolveData(data.flyingPet,"FlyingPet");
	}

	/*async fetchMatchDatas(limit){
		//TODO 매치 데이터를 객체로 묶어서 출력하자.
	}*/

	async getWinData(limit=500){
		const data = await this.client.api.getPlayer(this.id,limit,true);
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