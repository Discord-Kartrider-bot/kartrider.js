import type { Client } from './Client';
import type { rawUserMatchInfo } from './types'
import { Match } from './Match';
import { Player } from './Player';
export class MatchInfo extends Match{
    public player: Player;
    constructor(client: Client,data: rawUserMatchInfo){
    super(client,data);
    data.player.accountNo = data.accountNo;
    this.player = new Player(client,data.player,data.teamId);
    }
}