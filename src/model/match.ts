export interface Match {
    id: number;
    date: Date;

    players: string[];
    factions: string[];
    winners: string[];

    points_primary: number[];
    points_secondary: number[];
    points_total: number[];
}