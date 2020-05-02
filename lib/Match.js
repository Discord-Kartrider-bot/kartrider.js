const Base = require('./Base');
const { MatchType,Track } = require('../Data');
class Match extends Base{
	constructor(client,data){
		super(client);
		const type = Object.keys(MatchType).find(key => MatchType[key] === data.matchType);
		this.type = type ? type : 'UNKNOWN';
		if (data) this._patch(data);
	}
	_patch(data){
		this.id = data.matchId;
		this.matchResult = data.matchResult;
		//0: 리타이업니다! 1: 빨간팀 승리 2: 블루팀 승리
		this.channel = data.channelName;
		this.start = data.startTime;
		this.end = data.endTime;
		this.totalTime = data.playTime;
		this.playerCount = data.playerCount;
		this.track = new Object();
		this.track.id = data.trackId;
		const tg3 = Track.find(d=>d.id == data.trackId);
		this.track.name = tg3 ? tg3.name : "UNKNOWN";
	}
	get channelType(){
		const {MatchTypeEnum} = require('../Data');
		return MatchTypeEnum.filter(m=> this.channel.includes(m));
	}
	isWinner(){

	}
}
module.exports = Match;