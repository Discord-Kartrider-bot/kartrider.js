import { KartMetaData } from '../src';
import * as path from 'path';

(async ()=>{
  /* const data= await KartMetaData.init();
   data.path = path.join(path.resolve(),'metadata');
   console.log('fetchData Result:',Object.keys(data.data).map(key=> ({key,size:data.data[key].size})));
   await data.save();*/
   const data0= await KartMetaData.init(path.join(path.resolve(),'metadata'));
   console.log('Result:',Object.keys(data0.data).map(key=> ({key,size:data0.data[key].size})));
})()