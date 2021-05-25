import type {rawPlayer} from '../typings/raw'
export default class Player{
public id: string;
public name: string;
public _characterID: string;
public _kartID: string;
public _petID: string;
public _flyingPetID: string;
public matchTime: string;
public matchWin: string;
public _lisenceID: string;
public matchRetired: string;
constructor(data: rawPlayer){
    this.id = data.accountNo;
    this.name = data.characterName;
    this._characterID = data.character;
    this._kartID = data.kart;
    this._petID = data.pet;
    this._flyingPetID = data.flyingPet;
    this.matchTime = data.matchTime;
    this.matchWin = data.matchWin;
    this._lisenceID = data.rankinggrade2;
    this.matchRetired = data.matchRetired;
}
}