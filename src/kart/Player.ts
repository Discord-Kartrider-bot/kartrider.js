import type {rawPlayer} from '../../typings/raw'
export default class Player{
public id: string;
public name: string;
public _characterID: string;
public _kartID: string;
public _petID: string;
public _flyingPetID: string;
public matchTime: number;
public matchWin: boolean;
public _lisenceID: string;
public matchRetired: boolean;
public matchRank: number | null;
public teamID: string | undefined;
constructor(data: rawPlayer,teamID?: string){
    this.id = data.accountNo;
    this.name = data.characterName;
    this._characterID = data.character;
    this._kartID = data.kart;
    this._petID = data.pet;
    this._flyingPetID = data.flyingPet;
    this.matchTime = Number(data.matchTime);
    this.matchWin = Boolean(Number(data.matchWin));
    this._lisenceID = data.rankinggrade2;
    this.matchRetired = Boolean(Number(data.matchRetired));
    this.matchRank = !this.matchRetired ? Number(data.matchRank): null;
    this.teamID = teamID;
}

}