import { Match } from "./match.ts";
import { addMatchToFirestore, getLatestMatches } from "../Firebase";
import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { FACTIONS } from "./factions.ts";
import { QuerySnapshot } from "firebase/firestore";

export class LeaderBoardModel {
    @observable currentMatchId: Date | undefined = undefined;
    ready: boolean = false;
    @observable loading = false
    @observable error = undefined
    @observable matches: Match[] = []
    @observable matchUnderCreation : any = {formInputValues:[{label: "mPlayer1",num: "1",type: "text",player_value: "",faction_value:""}, {label: "mPlayer2",num: "2",type: "text",player_value: "",faction_value:""}], numOfPlayers:2, focusedValue:undefined,winners:undefined,primary_points:0,secondary_points:0,}

    readonly DEFAULT_CREATE_MATCH: {formInputValues:[{label: "mPlayer1",num: "1",type: "text",player_value: "",faction_value:""}, {label: "mPlayer2",num: "2",type: "text",player_value: "",faction_value:""}], numOfPlayers:2, focusedValue:undefined,winners:undefined,primary_points:0,secondary_points:0,}
    constructor() {
        this.matches = [];
        makeObservable(this);

        this.loading = true
        getLatestMatches(10).then((querySnapshot) => {
            runInAction(() => { // Run in action för att mobx ska fatta att vi uppdaterar state
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    this.addMatchFromFirestore(
                        new Match(
                            data.players,
                            data.factions,
                            data.winners,
                            data.points_primary,
                            data.points_secondary,
                            data.date.toDate(),
                        )
                    )
                })
                this.loading = false
            })
        }).catch((error) => {
            runInAction(() => {
                this.loading = false
                console.error("Error reading from firestore:", error)
                this.error = error
            })
        })
    }

    @action addMatchFromFirestore(match: Match) {
        if (!this.matches) {
            this.matches = []
        }
        // Måste göra detta för att mobx ska fatta att arrayen uppdateras
        this.matches = [...this.matches, match]
    }

    @action addMatch(match: Match) {
        if (!this.matches) {
            this.matches = []
        }
        this.matches = [...this.matches, match]
        return addMatchToFirestore(match)
    }

    @action startMatchCreation(){
        this.matchUnderCreation = {formInputValues:[{label: "mPlayer1",num: "1",type: "text",player_value: "",faction_value:""}, {label: "mPlayer2",num: "2",type: "text",player_value: "",faction_value:""}], numOfPlayers:2, focusedValue:undefined,winners:undefined,primary_points:0,secondary_points:0,}
    }

    @action cancelMatchCreation(){
        this.matchUnderCreation = {formInputValues:[{label: "mPlayer1",num: "1",type: "text",player_value: "",faction_value:""}, {label: "mPlayer2",num: "2",type: "text",player_value: "",faction_value:""}], numOfPlayers:2, focusedValue:undefined,winners:undefined,primary_points:0,secondary_points:0,}
    }

    @action addPlayerToForm() {
        this.matchUnderCreation.numOfPlayers++;
        this.matchUnderCreation.formInputValues=[...this.matchUnderCreation.formInputValues, 
            {
            label: "mPlayer" + this.matchUnderCreation.numOfPlayers,
            num: this.matchUnderCreation.numOfPlayers.toString(),
            type: "text",
            player_value: "",
            faction_value:""
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
        const tempVar = {...this.matchUnderCreation};
        tempVar.formInputValues[index].faction_value = this.matchUnderCreation.focusedValue;
        this.matchUnderCreation = tempVar;
    }

    @action handlePrimaryPointsChange(e) {
        const tempVar = {...this.matchUnderCreation};
        tempVar.primary_points = Number(e);
        this.matchUnderCreation = tempVar;
    }

    @action handleSecondaryPointsChange(e) {
        const tempVar = {...this.matchUnderCreation};
        tempVar.secondary_points = Number(e);
        this.matchUnderCreation = tempVar;
    }

    getMatches(): Match[] {
        return this.matches || []
    }
}