import type { KartMetaData } from '@/metadata/KartMetaData';
import type { rawUserMatchInfo } from '@typings/raw'
import Match from '@/kart/Match';
import Player from '@/kart/Player';
export default class UserMatchInfo extends Match{
    public player: Player;
    constructor(data: rawUserMatchInfo,kartMetaData?:KartMetaData){
    super(data,kartMetaData);
    data.player.accountNo = data.accountNo;
    this.player = new Player(data.player,data.teamId,kartMetaData);
    }
}