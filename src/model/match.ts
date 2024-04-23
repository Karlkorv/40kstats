export class Match {
    constructor(players: string[], factions: string[], winners: string[], p_points: number[], s_points: number[], date: Date = new Date(), userID?: string, notes?: string, matchID?: string) {
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
        this.userID = userID;
        this.matchID = matchID;
        this.notes = notes;
    }

    userID: string | undefined;
    matchID: string | undefined;
    date: Date;

    players: string[];
    factions: string[];
    winners: string[];

    points_primary: number[];
    points_secondary: number[];
    points_total: number[];

    notes: string | undefined;

    public getDateString(): string {
        return this.date.toDateString();
    }

    public setId(id: string) {
        if (this.matchID && this.matchID != id) {
            throw new Error("Tried to set different id on a match that already has an id");
        }
        this.matchID = id;
    }

    public setUserID(id) {
        if (!id) { return alert("Error: Invalid User ID") }
        this.userID = id;
        console.log(this);
    }
}