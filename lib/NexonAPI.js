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

api.prototype._getID = function(name){
	return new Promise(async (resolve,reject)=>{
	try{
	const res = await this.base.get('users/nickname/'+encodeURIComponent(name));
	resolve(JSON.parse(res.body).accessId);
	}catch(e){
		if(e.response&&e.response.statusCode&&e.response.statusCode == 404) resolve();
		else if(e.response&&e.response.statusCode)reject(new Error(`API Exception:  CODE: ${e.response.statusCode} => users/nickname/`+name));
		else reject(new Error(`API Exception: ${e} => users/nickname/`+name));
	}
	});
},

api.prototype._getName = function(id){
	return new Promise(async (resolve,reject)=>{
	try{
	const res = await this.base.get('users/'+id);
	resolve((JSON.parse(res.body).name));
	}catch(e){
		if(e.response&&e.response.statusCode&&e.response.statusCode == 404) resolve();
		else if(e.response&&e.response.statusCode)reject(new Error(`API Exception:  CODE:${e.response.statusCode} => users/`+id));
		else reject(new Error(`API Exception: ${e} => users/${id}`));
	}
	});
},

api.prototype.getPlayer = function (data,limit=20,returnJson=false){
	return new Promise(async (resolve,reject)=>{
	let id;
	try{
	if(data.name) id = await this._getID(data.name);
	else if(data.id) id = data.id;
	else throw new Error(`ID data undefined`);
	const searchParams = new URLSearchParams([['limit', limit]])
	const res = await this.base.get('users/'+id+"/matches",{searchParams});
	if(!JSON.parse(res.body).matches.length) return resolve();
		if(!returnJson) resolve(new Player(this.client,JSON.parse(res.body)));
		else resolve(JSON.parse(res.body));
}catch(e){ 
	if(e.response&&e.response.statusCode&&e.response.statusCode == 404) resolve();
	else if(e.response&&e.response.statusCode)reject(new Error(`API Exception:  CODE:${e.response.statusCode} => users/${id}/matches/`));
	else reject(new Error(`API Exception: ${e} => matches/\nSTACK TRACE:\n${e.stack}`));
}	
});
},

api.prototype.getMatchInfo = function(id){
	return new Promise(async (resolve,reject)=>{
	try{
	const res = await this.base.get("matches/"+id);
	resolve(new MatchDetail(this.client,JSON.parse(res.body)));
	}catch(e){ 
		if(e.response&&e.response.statusCode&&e.response.statusCode == 404) resolve();
		else if(e.response&&e.response.statusCode) reject(new Error(`API Exception:  CODE:${e.response.statusCode} => matches/${id}`));
		else reject(new Error(`API Exception: ${e} => matches/${id}`));
	}
	});
},

// DEPARATED:
// 사유: 더미 데이터 밖에 없음.
api.prototype.getMatchList = function(limit=50,returnJson=true,Type){
if(limit > 500){ return Promise.reject(new Error(`Exception: number is too big.`));}
	return new Promise(async (resolve,reject)=>{
	try{
	const searchParams = new URLSearchParams([['limit', limit]])
	if(Type) searchParams.append("match_types",Type);
	const res = await this.base.get("matches/all",{searchParams});
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
}catch(e){
	if(e.response&&e.response.statusCode&&e.response.statusCode == 404) resolve();
	else if(e.response&&e.response.statusCode) reject(new Error(`API Exception:  CODE:${e.response.statusCode} => matches/${id}`));
	else reject(new Error(`API Exception: ${e} => matches/all`));
}
	});
}
module.exports = api;