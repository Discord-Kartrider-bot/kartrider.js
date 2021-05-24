export interface rawUserMatchList{
    nickname: string;
    matches: rawMatchTypeMatches[];
}

export interface rawMatchTypeMatches{
    matchType: string;
    matches: rawUserMatchInfo[]
}

interface rawMatch{
    matchId: string;
    matchType: string;
    startTime: string;
    endTime: string;
    channelName: string;
    trackId: string;
    matchResult: string;
}

export interface rawUserMatchInfo extends rawMatch{
    accountNo: string;
    teamId: string;
    character: string;
    playerCount: number;
    player: rawPlayer;
    playTime: number;
}
export interface rawMatchDetail extends rawMatch{
    playTime: number;
    players?: rawPlayer[];
    teams?: rawMatchTeam[];
    gameSpeed: number;
}

export interface rawMatchTeam{
    teamId: string;
    players: rawPlayer[];
}

export interface rawPlayer{
    accountNo: string;
    character: string;
    kart: string;
    licence: string;
    pet: string;
    flyingPet: string;
    partsEngine:string;
    partsHandle: string;
    partsWheel: string;
    partsKit: string;
    matchRank: string;
    matchWin: string;
    matchTime: string;
    matchRetired: string;
    rankinggrade2: string;
    characterName: string;
}