import { Match } from "./match";

export class MatchCreatorInput {
    constructor(
        date: Date,
        formInputValues: Array<{ label: string, num: string, type: string, player_value: string, faction_value: string, p_points: number, s_points: number }>,
        numOfPlayers: number,
        focusedValue: string,
        winners: string,
        notes?: string,
        matchID?: string,
        userID?: string,
    ) {
        this.date = date;
        this.formInputValues = formInputValues;
        this.numOfPlayers = numOfPlayers;
        this.focusedValue = focusedValue;
        this.winners = winners;
        this.notes = notes;
        this.matchID = matchID;
        this.userID = userID;

    }

    date: Date
    formInputValues: Array<{ label: string, num: string, type: string, player_value: string, faction_value: string, p_points: number, s_points: number }>
    numOfPlayers: number
    focusedValue: string
    winners: string
    notes: string | undefined
    matchID: string | undefined
    userID: string | undefined
}

export function matchToMatchCreatorInput(match: Match) {
    const formInputValues = match.players.map((player, index) => ({
        label: `mPlayer${index + 1}`,
        num: `${index + 1}`,
        type: "text",
        player_value: player,
        faction_value: match.factions[index],
        p_points: match.points_primary[index],
        s_points: match.points_secondary[index],
    }));

    const date = match.date ? new Date(match.date) : new Date();
    const numOfPlayers = match.players.length;
    const focusedValue = "";
    const winners = match.winners[0];
    const notes = match.notes;
    const matchID = match.matchID;
    const userID = match.userID;

    return new MatchCreatorInput(date, formInputValues, numOfPlayers, focusedValue, winners, notes, matchID, userID);
}

export const DEFAULT_CREATE_MATCH: MatchCreatorInput = {
    date: new Date(),
    formInputValues: [
        { label: "mPlayer1", num: "1", type: "text", player_value: "", faction_value: "", p_points: 0, s_points: 0 },
        { label: "mPlayer2", num: "2", type: "text", player_value: "", faction_value: "", p_points: 0, s_points: 0 }
    ],
    numOfPlayers: 2,
    focusedValue: "",
    winners: "",
    notes: "",
    matchID: undefined,
    userID: undefined
}