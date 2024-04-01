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

    getMatches(): Match[] {
        return this.matches || []
    }
}