import {KartClient} from '../src'
import {token} from './auth.json'
import _ from 'lodash';

const client = new KartClient(token);
(async () =>{
const userinfo = await client.getUserBasicInfoByName('코로나행열차');
const matchlist = await client.getUserMatchList(userinfo);
console.log(matchlist)
})();