const Match = require('./Match');
const Player = require('./Player');

class MatchDetail extends Match{
	constructor(client,data){
		super(client);
		if (data) this._patch(data);
	}
	_patch(data){
		super._patch(data);
		this.speed = data.speed;
		this.players = data.players;
		this.playerCount = data.teams; //TODO 총 몇명! 
		// TODO 팀 분배
		this.
		this.teams = new Team(client,data.teams);
	}
	getPlayer(id){
	if(this.players) return new Player(this.players.find(e => e.id == id));
	}
	get isTeam(){
	 if (!this.teams) return false;
	 return true;
	}
}
module.exports = MatchDetail;