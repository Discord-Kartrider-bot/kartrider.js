import {KartClient} from '../src'
import {token} from './auth.json'
import * as _ from 'lodash';

const kartClient = new KartClient(token);
(async ()=>{
const wrongInfo =await kartClient.getUserBasicInfoByName('WEEEEEEEEE!');
console.log('getUserBasicInfoByName(): Check Insert Wrong Nickname:',_.isNull(wrongInfo));

const wrongInfoByID =await kartClient.getUserBasicInfoByID('00000000000');
console.log('getUserBasicInfoByID(): Check Insert Wrong ID:',_.isNull(wrongInfoByID));

const userInfo = await kartClient.getUserBasicInfoByName('코로나행열차');
console.log('getUserBasicInfoByName(): Check Real Nickname:',userInfo);
if(!userInfo) return console.log('userInfo is null!');
const userID = userInfo.accessId
const userInfoByID = await kartClient.getUserBasicInfoByID(userID);
console.log('Reverse search is Same?:',_.isEqual(userInfo,userInfoByID))
})();