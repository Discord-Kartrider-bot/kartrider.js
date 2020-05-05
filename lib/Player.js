
/*트랙 리스트를 불러올 때 각종 정보가 안뜨니까
 *
 * Player 객체를 분리할 필요가 있음.
*/
//TODO PLAYER 객체 분리.

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
	
	if(data.pet){
		const Pet = Data.get("Pet");
		this.pet = new Object();
		this.pet.id = data.pet;
		const tg1 = Pet.find(d=>d.id == data.pet);
		this.pet.name = tg1 ? tg1.name : "UNKNOWN";
	}

	if(data.flyingPet){
		const flypet = Data.get("FlyingPet");
		this.fly = new Object();
		this.fly.id = data.flyingPet;
		const tg2 = flypet.find(d=>d.id == data.flyingPet);
		this.fly.name = tg2 ? tg2.name : "UNKNOWN";
	}

	 switch(data.rankinggrade2){
        case "1": this.license = "초보";break; case "2": this.license = "루키";break;
        case "3": this.license = "L3"; break; case "4": this.license = "L2"; break;
        case "5": this.license = "L1"; break; case "6": this.license ="PRO"; break;
		default: this.license = "없음"; break;
	 }

	 this.kart = new Object();
	 this.kart.id = data.kart;
	 const tg3 = Data.get("Kart").find(d=>d.id == data.kart);
	 this.kart.name = tg3 ? tg3.name : "UNKNOWN";

	 this.character = new Object();
	 this.character.id = data.character;
	 const tg4 = Data.get("Character").find(d=>d.id == data.character);
	 this.character.name = tg4 ? tg4.name : "UNKNOWN";
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