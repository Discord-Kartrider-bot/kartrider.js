import type { rawUserMatchInfo } from '../../typings/raw'
import Match from './Match';
import Player from './Player';
export default class UserMatchInfo extends Match{
    public player: Player;
    constructor(data: rawUserMatchInfo){
    super(data);
    data.player.accountNo = data.accountNo;
    this.player = new Player(data.player,data.teamId);
    }
}