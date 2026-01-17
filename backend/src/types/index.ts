export interface LiveMatch {
    id: string;
    teamA: string;
    teamB: string;
    scoreA: number;
    scoreB: number;
    status: string;
    matchType: string;
    venue: string;
    date: string;
}

export interface MatchDetail {
    id: string;
    teamA: string;
    teamB: string;
    scoreA: number;
    scoreB: number;
    overs: number;
    status: string;
    players: {
        teamA: string[];
        teamB: string[];
    };
    venue: string;
    date: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}