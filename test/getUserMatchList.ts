import {KartClient} from '../src'
import {token} from './auth.json'
import _ from 'lodash';

const client = new KartClient(token);
(async () =>{
const userinfo = await client.getUserBasicInfoByName('코로나행열차');
if(!userinfo){console.log('userinfo is null'); return;}
const matchlist = await client.getUserMatchList(userinfo);
if(!matchlist) return;
console.log(matchlist.matchList[0])
})();