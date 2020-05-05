const Match = require('./Match');
const Player = require('./Player');

class MatchDetail extends Match{
	constructor(client,data){
		super(client,data);
		if (data) this._patch(data);
	}
	_patch(data){
		super._patch(data);
		this.speed = data.speed;
		if(data.players)
		this.players = data.players.map(m=>new Player(this.client,m));
		//TODO 총 몇명 연산 
		
		// TODO 팀 분배 해야함
		if(data.teams)
		this.teams = data.teams.map(m=>m.players.map(mp=>new Player(this.client,mp)));
	}
	getPlayer(id){
	if(this.players) return this.players.find(m => m.id == id);
	return null;
	}
}
module.exports = MatchDetail;