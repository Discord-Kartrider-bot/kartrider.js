import {KartClient, KartMetaData} from '../src'
import {token} from './auth.json'
import _ from 'lodash';
import * as path from 'path';

(async () =>{
const Metadata = await KartMetaData.init(path.join(path.resolve(),'metadata'));
const client = new KartClient(token,Metadata);
const userinfo = await client.getUserBasicInfoByName('코로나행열차');
if(!userinfo){console.log('userinfo is null'); return;}
const matchlist = await client.getUserMatchList(userinfo);
if(!matchlist) return;
console.log(matchlist.matchList[0])
})();