import { Match } from "./match.ts";
import { addMatchToFirestore, clearPersistence, getLatestMatches, getMatchById, getTotalMatchesFromFirestore, deleteMatchFromFirestore, auth, getUsername, userExists, addUserName, getUsernames, connectionRef } from "../Firebase.ts";
import { action, makeObservable, observable, runInAction } from "mobx";
import { User } from "firebase/auth";
import { MatchCreatorInput, DEFAULT_CREATE_MATCH } from "./FormModel.ts";
import { onValue } from "firebase/database";

export class LeaderBoardModel {
    readyToExport: boolean = false;
    @observable connected = true
    @observable matches: Match[] = []
    @observable matchUnderCreation: MatchCreatorInput = DEFAULT_CREATE_MATCH;
    @observable currentMatch: Match | undefined = undefined
    @observable gettingCurrentMatch: boolean = false
    @observable user: User | null = null;
    @observable usernameInput: string = "";
    @observable totalMatches: number = 0
    @observable username: string | null = null;
    @observable usernames: string[] = [];
    @observable availableUsernames: string[] = [];
    @observable isValidUserName: boolean | null = null;
    @observable usernameExists: boolean = false;
    @observable helpTextOpen: boolean = false;
    @observable confirmDeleteDialogOpen : boolean = false;
    @observable toggleFilter : boolean = false;

    @observable gettingMatches: boolean = true
    @observable gettingUser: boolean = true
    @observable gettingUsername: boolean = false
    @observable error: any = null

    @observable persistenceData: {
        writing: boolean,
        lastWritten: Date | null,
        oldMatch: MatchCreatorInput | null,
    } = {
            writing: false,
            lastWritten: null,
            oldMatch: null,
        }




    constructor() {
        onValue(connectionRef, (snapshot) => {
            runInAction(() => {
                this.setConnection(snapshot.val());
            })
        })

        makeObservable(this);
        this.matches = [];

        this.getLatestMatchesFromFirestore();
        getTotalMatchesFromFirestore().then((total) => {
            this.totalMatches = total;
        })

        auth.onAuthStateChanged(() => {
            runInAction(() => {
                this.gettingUsername = (auth.currentUser != null);

                this.setUser(auth.currentUser);
                this.gettingUser = false;
            });
            getUsername().then((result) => {
                runInAction(() => {
                    this.username = result;
                    this.gettingUsername = false;
                })
            }, (error) => {
                console.log("Error when resolving promise: ", error)
            })
            this.getUsernamesFromfirestore() // TODO: Debounce this when typing
        })
    }

    @action logPersistenceWrite() {
        const tempVar = {
            writing: false,
            lastWritten: new Date(),
            oldMatch: null,
        }

        this.persistenceData = tempVar;
    }

    @action startPersistenceWrite() {
        const tempVar = {
            writing: true,
            lastWritten: null,
            oldMatch: null,
        }

        this.persistenceData = tempVar;
    }

    @action readFromPersistence(oldMatch: MatchCreatorInput) {
        const tempVar = {
            writing: this.persistenceData.writing,
            lastWritten: this.persistenceData.lastWritten,
            oldMatch: oldMatch,
        }

        this.persistenceData = tempVar;
    }

    @action overwriteFromPersistence() {
        const tempVar = {
            writing: false,
            lastWritten: null,
            oldMatch: null,
        }

        this.matchUnderCreation = this.persistenceData.oldMatch!;
        this.persistenceData = tempVar;
    }

    @action clearPersistenceData() {
        const tempVar = {
            writing: false,
            lastWritten: null,
            oldMatch: null,
        }

        this.persistenceData = tempVar;
        clearPersistence(this);
    }

    @action setConnection(connected: boolean) {
        this.connected = connected;
    }

    @action setUsernameInput(username: string) {
        this.usernameInput = username;
        this.checkUsername(username)
    }

    @action getUsernamesFromfirestore() {
        getUsernames().then((usernames) => {
            runInAction(() => {
                this.usernames = usernames;
                this.availableUsernames = usernames;
            })
        })
    }

    @action createUserName() {
        if (this.username) {
            return;
        }

        addUserName(this.usernameInput).then(() => {
            runInAction(() => {
                this.username = this.usernameInput;
            })
        }).catch((error) => { console.log("Tried to create invalid username: " + error) })
    }

    @action checkUsername(username: string) {
        if (username.length < 3 || username.length > 20) {
            this.isValidUserName = false;
            this.usernameExists = false;
            return;
        }
        userExists(username).then((result) => {
            runInAction(() => {
                this.isValidUserName = !result;
                this.usernameExists = result;
            })
        })
    }

    @action private getLatestMatchesFromFirestore() {
        this.gettingMatches = true;
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
                this.gettingMatches = false;
                console.error("Error reading from firestore:", error);
                this.error = error;
            });
        }).finally(() => {
            runInAction(() => {
                this.gettingMatches = false;
            })
        });
    }

    @action setUser(user: User | null) {
        this.user = user;
        getUsername().then((result) => {
            runInAction(() => {
                this.username = result;
            })
        })
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
            addMatchToFirestore(match).then((id) => {
                runInAction(() => {
                    match.setId(id!);
                    clearPersistence(this);
                    this.matches = [match, ...this.matches];
                    this.totalMatches++;
                })
            });
            // If matchID exists, it means we are editing an existing match
        } else {
            let index = this.matches.findIndex(((matchInArray) => matchInArray.matchID === match.matchID))
            let tempVar = [...this.matches];
            tempVar[index] = match;
            this.matches = tempVar;
            addMatchToFirestore(match).then((id) => {
                clearPersistence(this);
            });
        }
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
        this.matchUnderCreation.userID = this.user?.uid;
    }

    @action cancelMatchCreation() {
        this.persistenceData = { writing: false, lastWritten: null, oldMatch: this.matchUnderCreation };
        this.matchUnderCreation = DEFAULT_CREATE_MATCH;
        clearPersistence(this);
    }

    @action addPlayerToForm() {
        let tempVar: MatchCreatorInput = this.matchUnderCreation;
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
        let tempVar: MatchCreatorInput = { ...this.matchUnderCreation };
        let inputVal = e;
        tempVar.formInputValues[index].player_value = inputVal;
        this.matchUnderCreation = tempVar;
    }

    @action handleFactionChange(e, index) {
        let tempVar = { ...this.matchUnderCreation };
        let inputVal = e;
        tempVar.formInputValues[index].faction_value = inputVal;
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

    @action handleDateChange(e) {
        let tempVar = { ...this.matchUnderCreation };
        tempVar.date = e;
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
                    window.location.hash = "#/match/matchNotFound";
                    console.error("Match not found");
                    return;
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

    @action handleCloseDialog() {
        this.helpTextOpen = false;
    }

    @action handleDialogClick() {
        this.helpTextOpen = !this.helpTextOpen;
    }

    @action handleDeleteDialogClick(){
        this.confirmDeleteDialogOpen = !this.confirmDeleteDialogOpen;
    }

    @action toggleUserFilter(){
        this.toggleFilter = !this.toggleFilter;
    }
}