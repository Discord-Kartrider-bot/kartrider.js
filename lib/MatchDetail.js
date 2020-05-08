const Match = require('./Match');
const Player = require('./Player');

class MatchDetail extends Match{
	constructor(client,data){
		super(client,data);
		if (data) this._patch(data);
	}
	_patch(data){
		super._patch(data);
		this.speed = data.gameSpeed;
		this.isDetail = true;
		if(data.players)
		this.players = data.players.map(m=>new Player(this.client,m));
		if(data.teams)
		this.teams = data.teams
		.sort((a,b) => parseInt(a.teamId)-parseInt(b.teamId))
		.map(m=>Object.assign(m.players.map(mp=>new Player(this.client,mp)),{'teamID': m.teamId}));
	}
	getPlayer(id){
	if(this.players) return this.players.find(m => m.id == id);
	return null;
	}
	get winTeam(){
		if(this.isTeam){
			if(this._matchResult == "0") return;
			return this._matchResult;
		}
	}
}
module.exports = MatchDetail;