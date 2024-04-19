import { Match } from "./match.ts";
import { addMatchToFirestore, clearPersistence, getLatestMatches, getMatchById, getTotalMatchesFromFirestore, deleteMatchFromFirestore } from "../Firebase.ts";
import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { FACTIONS } from "./factions.ts"
import { User } from "firebase/auth";
import { MatchCreatorInput, DEFAULT_CREATE_MATCH } from "./FormModel.ts";

export class LeaderBoardModel {
    ready: boolean = false;
    @observable loading = false
    @observable error = undefined
    @observable matches: Match[] = []
    @observable matchUnderCreation: MatchCreatorInput = DEFAULT_CREATE_MATCH;
    @observable currentMatch: Match | undefined = undefined
    @observable gettingCurrentMatch: boolean = false
    @observable user: User | null = null;

    totalMatches: number = 0

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
                            data.userID,
                            data.notes,
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

    @action setUser(user: User | null) {
        this.user = user;
        this.matchUnderCreation.userID = user?.uid;
    }

    @action userLoggedOut() {
        this.user = null;
        this.matchUnderCreation = DEFAULT_CREATE_MATCH;
    }

    @action setMatchUnderCreation(match: any) {
        this.matchUnderCreation = match;
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
                            data.userID,
                            data.notes,
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
        match.setUserID(this.user?.uid);
        if (!match.matchID) {
            this.matches = [match, ...this.matches];
            this.totalMatches++;
        } else {
            let index = this.matches.findIndex(((matchInArray) => matchInArray.matchID === match.matchID))
            let tempVar = [...this.matches];
            tempVar[index] = match;
            this.matches = tempVar;
        }
        addMatchToFirestore(match).then((id) => {
            match.setId(id!);
            clearPersistence(this);
        })
        this.matchUnderCreation = DEFAULT_CREATE_MATCH;
    }

    @action deleteMatch(id) {
        let index = this.matches.findIndex(({ matchID }) => matchID === id);
        let tempVar = this.matches.slice(0, index).concat(this.matches.slice(index + 1));
        deleteMatchFromFirestore(id);
        this.matches = tempVar;
    }

    @action editMatch(matchFormValues: MatchCreatorInput) {
        this.matchUnderCreation = matchFormValues;
    }

    @action startMatchCreation() {
        this.matchUnderCreation = DEFAULT_CREATE_MATCH;
        this.matchUnderCreation.userID = this.user?.uid;
    }

    @action cancelMatchCreation() {
        this.matchUnderCreation = DEFAULT_CREATE_MATCH;
    }

    @action addPlayerToForm() {
        let tempVar : MatchCreatorInput = this.matchUnderCreation;
        tempVar.numOfPlayers++;
        tempVar.formInputValues = [...this.matchUnderCreation.formInputValues,
            {
                label: "mPlayer" + this.matchUnderCreation.numOfPlayers,
                num: this.matchUnderCreation.numOfPlayers.toString(),
                type: "text",
                player_value: "",
                faction_value: "",
                p_points: 0,
                s_points: 0,
            }
        ];
        this.matchUnderCreation = tempVar;
    }

    @action removePlayerFromForm() {
        let formLength = this.matchUnderCreation.formInputValues.length;
        this.matchUnderCreation.numOfPlayers--;
        this.matchUnderCreation.formInputValues.splice(formLength - 1, 1);
    }

    @action handlePlayerInputFieldChange(e, index) {
        let tempVar : MatchCreatorInput = { ...this.matchUnderCreation };
        let inputVal = e.target.value;
        tempVar.formInputValues[index].player_value = inputVal;
        this.matchUnderCreation = tempVar;
    }

    @action handleFactionChange(e, index) {
        let tempVar = { ...this.matchUnderCreation };
        let inputVal = e.target.value;
        const options = Object.values(FACTIONS)
        if (options.includes(inputVal)) { tempVar.formInputValues[index].faction_value = inputVal; }
        this.matchUnderCreation = tempVar;
    }

    /* Not sure if handleFocus and handleBlur should be handled here or in the presenter
     */
    @action handleFocus(e) {
        this.matchUnderCreation.focusedValue = e.target.value;
    }

    @action handleBlur(e, index) {
        let tempVar = { ...this.matchUnderCreation };
        tempVar.formInputValues[index].faction_value = this.matchUnderCreation.focusedValue;
        this.matchUnderCreation = tempVar;
    }

    @action handlePrimaryPointsChange(e, index) {
        let tempVar = { ...this.matchUnderCreation };
        tempVar.formInputValues[index].p_points = Number(e);
        this.matchUnderCreation = tempVar;
    }

    @action handleSecondaryPointsChange(e, index) {
        let tempVar = { ...this.matchUnderCreation };
        tempVar.formInputValues[index].s_points = Number(e);
        this.matchUnderCreation = tempVar;
    }

    @action handleWinnerChange(e) {
        let tempVar = { ...this.matchUnderCreation };
        let inputVal = e.target.value;
        const options = this.matchUnderCreation.formInputValues.map(({ player_value }) => (player_value));
        if (options.includes(inputVal)) { tempVar.winners = inputVal; }
        this.matchUnderCreation = tempVar;
    }

    @action handleWinnerFocus(e) {

    }

    @action handleWinnerBlur(e) {
        let tempVar = { ...this.matchUnderCreation };
        tempVar.winners = this.matchUnderCreation.focusedValue;
        this.matchUnderCreation = tempVar;
    }

    @action handleNotesChange(e) {
        let tempVar = { ...this.matchUnderCreation };
        tempVar.notes = e.target.value;
        this.matchUnderCreation = tempVar;
    }

    @action setCurrentMatch(match: Match) {
        this.currentMatch = match
    }

    @action setCurrentMatchById(matchID: string) {
        const match = this.matches.find((match) => match.matchID === matchID)
        if (match) {
            this.currentMatch = match
            return
        }

        this.gettingCurrentMatch = true

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
                    data.userID,
                    data.notes,
                    doc.id
                )
            })
        }).catch((error) => {
            runInAction(() => {
                console.error("Error reading from firestore:", error)
                this.error = error
                this.currentMatch = undefined
            })
        }).finally(() => {
            runInAction(() => {
                this.gettingCurrentMatch = false
            })
        })
    }

    getMatches(): Match[] {
        return this.matches || []
    }
}