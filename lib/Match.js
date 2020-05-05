const Base = require('./Base');
const Data = require('./Data');
const Util = require('./utils')
class Match extends Base{
	constructor(client,data){
		super(client);
		this.type = Util.resolveData(data.matchType,"MatchType");
		if (data) this._patch(data);
	}
	_patch(data){
		this.id = data.matchId;
		//0: 리타이업니다! 1: 빨간팀 승리 2: 블루팀 승리
		//TODO result 값 enum 정하기
		this.matchResult = data.matchResult;
		this.channel = data.channelName;
		this.start = data.startTime;
		this.end = data.endTime;
		this.playerCount = data.playerCount;
		this.track = Util.resolveData(data.trackId,"Track");
	}
	/*get channelType(){
		//TODO 채널 타입 알아내기
		const {MatchTypeEnum} = require('../Data');
		return MatchTypeEnum.filter(m=> this.channel.includes(m));
	}*/
	get isTeam(){
	 return this.channel.includes('Team');
	}
	get isSpecialMode(){
		return this.channel.includes('_');
	}
	get startDate(){
		return new Date(this.start);
	}
	get endDate(){
		return new Date(this.end);
	}
	get playTime(){
		return (((this.endDate.getTime()-this.startDate.getTime())/1000)-10);
	}
	//
	/*isWinner(){
	// TODO 승리자 판정
	}*/
}
module.exports = Match;