const got = require('got');
const Player = require('./Player')
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

api.prototype.getPlayer = function (id){
	return new Promise(async (resolve,reject)=>{
	const searchParams = new URLSearchParams([['limit', 1]])
	const res = await this.base.get('users/'+id+"/matches");
	if(res.statusCode == 404) resolve(null);
	else if(res.statusCode == 200) resolve(new Player(this.client,JSON.parse(res.body)));
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

api.prototype.fetchMatchAll = function(limit,isGet){
if(limit > 500){ throw `Exception: number is too big.`;}
	return new Promise(async (resolve,reject)=>{
	const res = await this.base.get("matches/all");
	if(res.statusCode == 404) resolve(null);
	else if(res.statusCode == 200){
		const json =JSON.parse(res.body);
		if(!isGet){resolve(json); return;}
		let result = [];
		json.matches.forEach(e => {
			result.concat(e.matches);
		});
	resolve((await result.map( async e=> {
		return (await getMatch(e));
	})));
	}
	else reject(new Error(`API Exception:  CODE:${res.statusCode} => matches/all`));
	});
}
module.exports = api;