import { Match } from "./match.ts";
import { addMatchToFirestore, getLatestMatches, getMatchById, getTotalMatchesFromFirestore } from "../Firebase.ts";
import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { FACTIONS } from "./factions.ts"

export class LeaderBoardModel {
    ready: boolean = false;
    @observable loading = false
    @observable error = undefined
    @observable matches: Match[] = []
    @observable matchUnderCreation : any = {formInputValues:[{label: "mPlayer1",num: "1",type: "text",player_value: "",faction_value:"",p_points:0, s_points:0}, {label: "mPlayer2",num: "2",type: "text",player_value: "",faction_value:"",p_points:0, s_points:0}], numOfPlayers:2, focusedValue:undefined,winners:undefined,}
    @observable currentMatch: Match | undefined = undefined
    totalMatches: number = 0

    readonly DEFAULT_CREATE_MATCH: {formInputValues:[{label: "mPlayer1",num: "1",type: "text",player_value: "",faction_value:"",p_points:0, s_points:0}, {label: "mPlayer2",num: "2",type: "text",player_value: "",faction_value:"",p_points:0, s_points:0}], numOfPlayers:2, focusedValue:undefined,winners:undefined,}
    constructor() {
        this.matches = [];
        makeObservable(this);

        this.getLatestMatchesFromFirestore();
        getTotalMatchesFromFirestore().then((total) => {
            this.totalMatches = total;
        })
    }

    @action private getLatestMatchesFromFirestore() {
        this.loading = true;
        getLatestMatches(50).then((querySnapshot) => {
            runInAction(() => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (this.matches.find((match) => match.matchID === doc.id)) {
                        return;
                    }
                    this.addMatchFromFirestore(
                        new Match(
                            data.players,
                            data.factions,
                            data.winners,
                            data.points_primary,
                            data.points_secondary,
                            data.date.toDate(),
                            doc.id
                        )
                    );
                });
            });
        }).catch((error) => {
            runInAction(() => {
                this.loading = false;
                console.error("Error reading from firestore:", error);
                this.error = error;
            });
        }).finally(() => {
            runInAction(() => {
                this.loading = false;
            })
        });
    }

    @action getMoreMatches(amt?: number) {
        getLatestMatches(this.matches.length + (amt || 10)).then((querySnapshot) => {
            runInAction(() => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (this.matches.find((match) => match.matchID === doc.id)) {
                        return;
                    }
                    this.addMatchFromFirestore(
                        new Match(
                            data.players,
                            data.factions,
                            data.winners,
                            data.points_primary,
                            data.points_secondary,
                            data.date.toDate(),
                            doc.id
                        )
                    );
                });
            })
        })
    }

    @action addMatchFromFirestore(match: Match) {
        if (!this.matches) {
            this.matches = []
        }
        // Måste göra detta för att mobx ska fatta att arrayen uppdateras
        this.matches = [match, ...this.matches]
    }

    @action addMatch(match: Match) {
        if (!this.matches) {
            this.matches = []
        }
        this.matches = [match, ...this.matches]
        addMatchToFirestore(match).then((id) => {
            match.setId(id)
        })
    }

    @action startMatchCreation(){
        this.matchUnderCreation = {formInputValues:[{label: "mPlayer1",num: "1",type: "text",player_value: "",faction_value:"",p_points:0, s_points:0}, {label: "mPlayer2",num: "2",type: "text",player_value: "",faction_value:"",p_points:0, s_points:0}], numOfPlayers:2, focusedValue:undefined,winners:undefined,}
    }

    @action cancelMatchCreation(){
        this.matchUnderCreation = {formInputValues:[{label: "mPlayer1",num: "1",type: "text",player_value: "",faction_value:"",p_points:0, s_points:0}, {label: "mPlayer2",num: "2",type: "text",player_value: "",faction_value:"",p_points:0, s_points:0}], numOfPlayers:2, focusedValue:undefined,winners:undefined,}
    }

    @action addPlayerToForm() {
        this.matchUnderCreation.numOfPlayers++;
        this.matchUnderCreation.formInputValues=[...this.matchUnderCreation.formInputValues, 
            {
            label: "mPlayer" + this.matchUnderCreation.numOfPlayers,
            num: this.matchUnderCreation.numOfPlayers.toString(),
            type: "text",
            player_value: "",
            faction_value:"",
            p_points:0,
            s_points:0,
            }
        ]
    }

    @action removePlayerFromForm() {
        let formLength = this.matchUnderCreation.formInputValues.length;
        this.matchUnderCreation.numOfPlayers--;
        this.matchUnderCreation.formInputValues.splice(formLength-1, 1);
    }

    @action handlePlayerInputFieldChange(e, index){
        let tempVar = {...this.matchUnderCreation};
        let inputVal = e.target.value;
        tempVar.formInputValues[index].player_value = inputVal;
        this.matchUnderCreation = tempVar;
    }

    @action handleFactionChange(e, index){
        let tempVar = {...this.matchUnderCreation};
        let inputVal = e.target.value;
        const options = Object.values(FACTIONS)
        if(options.includes(inputVal)) {tempVar.formInputValues[index].faction_value=inputVal;}
        this.matchUnderCreation = tempVar;
    }

    /* Not sure if handleFocus and handleBlur should be handled here or in the presenter
     */
    @action handleFocus(e){
        this.matchUnderCreation.focusedValue=e.target.value;
    }

    @action handleBlur(e, index) {
        let tempVar = {...this.matchUnderCreation};
        tempVar.formInputValues[index].faction_value = this.matchUnderCreation.focusedValue;
        this.matchUnderCreation = tempVar;
    }

    @action handlePrimaryPointsChange(e, index) {
        let tempVar = {...this.matchUnderCreation};
        tempVar.formInputValues[index].p_points = Number(e);
        this.matchUnderCreation = tempVar;
    }

    @action handleSecondaryPointsChange(e, index) {
        let tempVar = {...this.matchUnderCreation};
        tempVar.formInputValues[index].s_points = Number(e);
        this.matchUnderCreation = tempVar;
    }

    @action handleWinnerChange(e){
        let tempVar = {...this.matchUnderCreation};
        let inputVal = e.target.value;
        const options = this.matchUnderCreation.formInputValues.map(({player_value}) => (player_value));
        if(options.includes(inputVal)) {tempVar.winners=inputVal;}
        this.matchUnderCreation = tempVar;
    }

    @action handleWinnerFocus(e){
        
    }

    @action handleWinnerBlur(e){
        let tempVar = {...this.matchUnderCreation};
        tempVar.winners = this.matchUnderCreation.focusedValue;
        this.matchUnderCreation = tempVar;
    }

    @action setCurrentMatch(match: Match) {
        this.currentMatch = match
    }

    @action setCurrentMatchById(matchID: string) {
        if (this.currentMatch && this.currentMatch.matchID === matchID) {
            return;
        }

        const match = this.matches.find((match) => match.matchID === matchID)
        if (match) {
            this.currentMatch = match
            return
        }

        getMatchById(matchID).then((doc) => {
            runInAction(() => {
                if (!doc.exists()) {
                    this.currentMatch = undefined
                    throw new Error("Match not found");
                }
                const data = doc.data()!
                this.currentMatch = new Match(
                    data.players,
                    data.factions,
                    data.winners,
                    data.points_primary,
                    data.points_secondary,
                    data.date.toDate(),
                )
            })
        }).catch((error) => {
            runInAction(() => {
                console.error("Error reading from firestore:", error)
                this.error = error
                this.currentMatch = undefined
            })
        })
    }

    getMatches(): Match[] {
        return this.matches || []
    }
}