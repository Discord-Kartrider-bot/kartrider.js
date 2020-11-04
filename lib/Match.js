const Base = require('./Base')
const Util = require('./utils')

class Match extends Base {
	constructor(client, data) {
		super(client)
		this.id = data.matchId
		this.type = Util.resolveData(data.matchType, "MatchType")
		this.isDetail = false
		if (data.playerCount) this._playerCount = data.playerCount
		if (data) this._patch(data)
	}
	_patch(data) {
		this._matchResult = data.matchResult
		this.channel = data.channelName
		this.start = data.startTime + "Z"
		this.end = data.endTime + "Z"
		this.track = Util.resolveData(data.trackId, "Track")
	}
	/*get channelType() {
		//TODO 채널 타입 알아내기
		const { MatchTypeEnum } = require('../Data')
		return MatchTypeEnum.filter(m=> this.channel.includes(m))
	}*/
	get speedmod(){
	if (this.channel.includes("Infinit")) return "무한"
	if (this.channel.includes("Fastest2Enchant")) return "가장빠름"
	if (this.channel.includes("Fastest")) return "매우빠름"
	if (this.channel.includes("Fast")) return "빠름"
	}
	get isTeam() {
	 return this.channel.includes('Team');
	}
	get isSpecialMode() {
		return this.channel.includes('_')
	}
	get startDate() {
		return new Date(this.start)
	}
	get endDate() {
		return new Date(this.end)
	}
	get playTime() {
		return this.endDate.getTime() - this.startDate.getTime()
	}
	get playerCount() {
		if (!this.isDetail) return this._playerCount
		if (this.isTeam) {
			return this.teams.map(d => d.length).reduce((a, b)=> { return a+b }, 0);
		} else { return this.players.length }
	}
	
	isWinner() {
		if (this.player) return this.player.isWin
		return
	}
}
module.exports = Match
