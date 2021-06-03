import type { KartMetaData } from '../metadata/KartMetaData';
import type { rawUserMatchInfo } from '../types'
import Match from './Match';
import Player from './Player';
export default class UserMatchInfo extends Match{
    public player: Player;
    constructor(data: rawUserMatchInfo,kartMetaData?:KartMetaData){
    super(data,kartMetaData);
    data.player.accountNo = data.accountNo;
    this.player = new Player(data.player,data.teamId,kartMetaData);
    }
}