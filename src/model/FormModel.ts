export class MatchCreatorInput {
    constructor(
        formInputValues: Array<{label: string, num: string, type: string, player_value: string, faction_value: string, p_points: Number, s_points: Number}>, 
        numOfPlayers: Number, 
        focusedValue: string,
        winners: string,
        notes: string | "",
        matchID?: string,
        userID?: string,
    ) {
        this.formInputValues = formInputValues;
        this.numOfPlayers = numOfPlayers;
        this.focusedValue = focusedValue;
        this.winners = winners;
        this.notes = notes;
        this.matchID = matchID;
        this.userID = userID;

    }
    
    formInputValues: Array<{label: string, num: string, type: string, player_value: string, faction_value: string, p_points: Number, s_points: Number}>
    numOfPlayers: Number
    focusedValue: string
    winners: string
    notes: string
    matchID: string | undefined
    userID: string | undefined
}

let DEFAULT_CREATE_MATCH : MatchCreatorInput = { 
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
export { DEFAULT_CREATE_MATCH }
