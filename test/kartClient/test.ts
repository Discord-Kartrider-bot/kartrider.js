import {KartClient} from '../../src/'
import {token} from '../auth.json'
import { assert } from 'chai';
describe('유저정보 조회', () => {
    let kart: KartClient;
    before(()=>{
        kart = new KartClient(token)
    })
    it('올바른 닉네임으로 정보 조회',async ()=>{
       const userBasicInfo = await kart.getUserBasicInfoByName('MochaTest')
       assert.isNotNull(userBasicInfo);
       assert.equal(userBasicInfo?.accessId,'688112936')
       assert.hasAllKeys(userBasicInfo,['accessId','level','name'])
    })
    it('올바르지 않은 닉네임으로 조회',async ()=>{
        const userBasicInfo = await kart.getUserBasicInfoByName('qgjowpejpoqjweopjaspdgq')
        assert.isNull(userBasicInfo);
     })
     it('올바른 id로 정보를 조회',async ()=>{
        const userBasicInfo = await kart.getUserBasicInfoByID('688112936')
        assert.isNotNull(userBasicInfo);
        assert.equal(userBasicInfo?.name,'MochaTest')
        assert.hasAllKeys(userBasicInfo,['accessId','level','name'])
     })
     it('올바르지 않은 id로 정보를 조회',async ()=>{
        const userBasicInfo = await kart.getUserBasicInfoByID('169023713096')
        assert.isNull(userBasicInfo);
     })
     it('매치 정보를 조회',async ()=>{
      const userBasicInfo = await kart.getUserBasicInfoByID('688112936').then(d=>d ? kart.getUserMatchList(d) : null);
      console.log(userBasicInfo)
   })
})