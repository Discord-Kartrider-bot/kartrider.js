import type { Readable } from "stream";

export interface UserBasicInfo{
    accessId: string;
    name?: string;
    level?: number;
}

export interface MetaDataInfo{
    id:string;
    name?: string;
}

export interface MetadataID{
    type: string,
    hash: string
    }
export interface fileMetaData{
        type: string,
        path: string
    }
export interface StreamMetaData{
        type: string,
        stream: Readable
    }
export interface rawUserMatchList{
        nickname: string;
        matches: rawMatchTypeMatches[];
    }
    
export interface rawMatchTypeMatches{
        matchType: string;
        matches: rawUserMatchInfo[]
    }
    
export interface rawMatch{
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