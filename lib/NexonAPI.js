const got = require('got');
const Player = require('./Player')
const MatchDetail = require('./MatchDetail');
const Util = require('./utils')
const api = function api(client){
this.client = client;

this.base = got.extend({
	prefixUrl: 'https://api.nexon.co.kr/kart/v1.0',
	headers: {
		'Authorization': client.token
	}
});
}

api.prototype.getID = function(name){
	return new Promise(async (resolve,reject)=>{
	const res = await this.base.get('users/nickname/'+encodeURIComponent(name));
	if(res.statusCode == 404) resolve(null);
	else if(res.statusCode == 200) resolve(JSON.parse(res.body).accessId);
	else reject(new Error('API Exception: CODE:'+res.statusCode+' => users/nickname/'+name));
	});
},

api.prototype.getName = function(id){
	return new Promise(async (resolve,reject)=>{
	const res = await this.base.get('users/'+id);
	if(res.statusCode == 404) resolve(null);
	else if(res.statusCode == 200) resolve((JSON.parse(res.body).name));
	else reject(new Error('API Exception: CODE:'+res.statusCode+' => users/'+id));
	});
},

api.prototype.getPlayer = function (id,limit=1,returnJson=false){
	return new Promise(async (resolve,reject)=>{
	const searchParams = new URLSearchParams([['limit', limit]])
	const res = await this.base.get('users/'+id+"/matches",{searchParams});
	if(res.statusCode == 404) resolve(null);
	else if(res.statusCode == 200){
		if(!returnJson) resolve(new Player(this.client,JSON.parse(res.body)));
		else resolve(JSON.parse(res.body));
	}
	else reject(new Error(`API Exception:  CODE:${res.statusCode} => users/${id}/matches/`));
	});
},

api.prototype.getMatchInfo = function(id){
	return new Promise(async (resolve,reject)=>{
	const res = await this.base.get("matches/"+id);
	if(res.statusCode == 404) resolve(null);
	else if(res.statusCode == 200) resolve(new MatchDetail(this.client,JSON.parse(res.body)));
	else reject(new Error(`API Exception:  CODE:${res.statusCode} => matches/${id}`));
	});
},
//이거 쓰지마삼 이거 뭔지 모르겠음 퉤퉤
api.prototype.getMatchList = function(limit=50,returnJson=true){
if(limit > 500){ return Promise.reject(new Error(`Exception: number is too big.`));}
	return new Promise(async (resolve,reject)=>{
	const searchParams = new URLSearchParams([['limit', limit]])
	const res = await this.base.get("matches/all",{searchParams});
	if(res.statusCode == 404) resolve(null);
	else if(res.statusCode == 200){
		const json =JSON.parse(res.body);
		if(returnJson){resolve(json); return;}
		const result = Util.mergeMatchData(json.matches);
		const r= await Promise.all(
					result.map( async (e)=> {
					const data = await this.getMatchInfo(e);
					return data;
					})
				).then((r)=>r.filter((d) => d.playTime > 1))
		resolve(r);
	}
	else reject(new Error(`API Exception:  CODE:${res.statusCode} => matches/all`));
	});
}
module.exports = api;