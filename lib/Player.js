const Data = require('./Data');
const Base = require('./Base');
class Player extends Base{
	constructor(client,data){
		super(client);
		if(data.matches){
		const match = data.matches[0].matches[0];
		//TODO 마지막 Match 데이터 가져와야함
		//this.match = new Match(match);
		match.player.characterName = data.nickName;
		match.player.accountNo = match.accountNo;
		this._patch(match.player);}
		else{
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
	_fetchData(limit){
		if(limit > 500){ throw `Exception: number is too big. yamete`;}
		return new Promise(async (resolve,reject)=>{
			const searchParams = new URLSearchParams([['limit', limit]])
			const res = await client.api.base.get("users/"+this.id+"/matches",{searchParams});
			if(res.statusCode == 404) resolve(null);
			else if(res.statusCode == 200){
				const json =await res.json();
				resolve(json); return;
			}
			else reject(new Error(`API Exception:  CODE:${res.statusCode} => users/${this.id}/matches/`));
			});
	}
	async fetchMatchDatas(limit){
		await this._fetchData(limit); 
	}
	async getwins(){
		const data = await this._fetchData(100);
		return this.mergeMatchData(data.matches).reduce((a,b)=>parseInt(a) + parseInt(b));
	}
	mergeMatchData(data){
		return data.matches.forEach(e => {
			result.concat(e.matches);
		});
	}
}
module.exports = Player;