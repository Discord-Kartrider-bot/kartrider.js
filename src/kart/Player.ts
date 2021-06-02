import type { KartMetaData } from '../';
import type { MetaDataInfo } from '../../typings/'
import type {rawPlayer} from '../../typings/raw'
export default class Player{
public id: string;
public name: string;
public character: MetaDataInfo;
public kart: MetaDataInfo;
public pet: MetaDataInfo;
public flyingPet: MetaDataInfo;
public matchTime: number;
public matchWin: boolean;
public _lisenceID: string;
public matchRetired: boolean;
public matchRank: number | null;
public teamID: string | undefined;

constructor(data: rawPlayer,teamID?: string,kartMetaData?:KartMetaData){
    this.id = data.accountNo;
    this.name = data.characterName;
    this.character = kartMetaData? kartMetaData.getMetaData({type:'character',hash:data.character}) : {id:data.character}
    this.kart = kartMetaData? kartMetaData.getMetaData({type:'kart',hash:data.kart}) : {id:data.kart}
    this.pet = kartMetaData? kartMetaData.getMetaData({type:'pet',hash:data.pet}) : {id:data.pet}
    this.flyingPet = kartMetaData? kartMetaData.getMetaData({type:'flyingPet',hash:data.flyingPet}) : {id:data.flyingPet}
    this.matchTime = Number(data.matchTime);
    this.matchWin = Boolean(Number(data.matchWin));
    this._lisenceID = data.rankinggrade2;
    this.matchRetired = Boolean(Number(data.matchRetired));
    this.matchRank = !this.matchRetired ? Number(data.matchRank): null;
    this.teamID = teamID;
}

}