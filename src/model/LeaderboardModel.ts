import { Match } from "./match.ts";
import { addMatchToFirestore, getLatestMatches, getMatchById } from "../Firebase.ts";
import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";

export class LeaderBoardModel {
    ready: boolean = false;
    @observable loading = false
    @observable error = undefined
    @observable matches: Match[] = []
    @observable currentMatch: Match | undefined = undefined

    constructor() {
        makeObservable(this);

        this.getLatestMatchesFromFirestore();
    }

    private getLatestMatchesFromFirestore() {
        this.loading = true;
        getLatestMatches(10).then((querySnapshot) => {
            runInAction(() => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
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
                this.loading = false;
            });
        }).catch((error) => {
            runInAction(() => {
                this.loading = false;
                console.error("Error reading from firestore:", error);
                this.error = error;
            });
        });
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
        addMatchToFirestore(match).then((id) => {
            match.setId(id)
        })
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