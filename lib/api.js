const got = require('got');
const { Player } = require('./player')
const base = got.extend({
	prefixUrl: 'https://api.nexon.co.kr/kart/v1.0',
	headers: {
		'Authorization': 'secret'
	}
});
module.exports = {
getID: async function(name){
	return new Promise((resolve,reject)=>{
	const res = await base.get('users/nickname/'+encodeURIComponent(name));
	if(res.statusCode == 404) resolve(null);
	else if(res.statusCode == 200) resolve((await res.json()).accessId);
	else reject(new Error('API Exception: CODE:'+res.statusCode+' => users/nickname/'+name));
	});
},
getName: async function(id){
	return new Promise((resolve,reject)=>{
	const res = await base.get('users/'+id);
	if(res.statusCode == 404) resolve(null);
	else if(res.statusCode == 200) resolve((await res.json()).name);
	else reject(new Error('API Exception: CODE:'+res.statusCode+' => users/'+id));
	});
},

getPlayer: async function (id){
	return new Promise((resolve,reject)=>{
	const searchParams = new URLSearchParams([['limit', 1]])
	const res = await base.get('users/'+id+"/matches");
	if(res.statusCode == 404) resolve(null);
	else if(res.statusCode == 200) resolve(new Player((await res.json())));
	else reject(new Error(`API Exception:  CODE:${res.statusCode} => users/${id}/matches/`));
	});
},

getMatchInfo: async function(id){
	return new Promise((resolve,reject)=>{
	const res = await base.get("matches/"+id);
	if(res.statusCode == 404) resolve(null);
	else if(res.statusCode == 200) resolve(new MatchDetail((await res.json())));
	else reject(new Error(`API Exception:  CODE:${res.statusCode} => matches/${id}`));
	});
},

fetchMatchAll : async function(limit,isGet){
if(limit > 500){ throw `Exception: number is too big.`; return null;}
	return new Promise((resolve,reject)=>{
	const res = await base.get("matches/all");
	if(res.statusCode == 404) resolve(null);
	else if(res.statusCode == 200){
		const json =await res.json();
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
}