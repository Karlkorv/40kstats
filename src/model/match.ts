export class Match {
    constructor(players: string[], factions: string[], winners: string[], p_points: number[], s_points: number[], date: Date = new Date(), matchID?: string, creatorID?: string) {
        if (players.length != factions.length || players.length != p_points.length || players.length != s_points.length) {
            throw new Error('The length of the arrays must be the same');
        }

        this.date = date;
        this.players = players;
        this.factions = factions;
        this.winners = winners;
        this.points_primary = p_points;
        this.points_secondary = s_points;
        this.points_total = p_points.map((value, index) => value + s_points[index]);
        this.matchID = matchID;
        this.creatorID = creatorID; 
    }

    creatorID: string | undefined;
    matchID: string | undefined;
    date: Date;

    players: string[];
    factions: string[];
    winners: string[];

    points_primary: number[];
    points_secondary: number[];
    points_total: number[];

    public getDateString(): string {
        return this.date.toDateString();
    }

    public setId(id: string) {
        if (this.matchID) {
            throw new Error("Tried to set id on a match that already has an id");
        }
        this.matchID = id;
    }

    public setCreatorId(id: string) {
        this.creatorID = id;
    }
}