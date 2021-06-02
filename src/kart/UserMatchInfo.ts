import type { KartMetaData } from '../';
import type { rawUserMatchInfo } from '../../typings/raw'
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