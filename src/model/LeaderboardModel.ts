import { Match } from "./Match";
import { FACTIONS } from "./factions";
import { addMatch, getMatches } from "../firebase";
import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";

export class LeaderBoardModel {
    @observable matches: Match[] = [];
    currentMatchId: Date | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    @action addMatchToModel(match: Match) {
        this.matches.push(match);
    }

    syncModel() {
        console.log("model syncing with firestore")
        getMatches(10).then((querySnapshot) => {
            runInAction(() => {
                querySnapshot.forEach((doc) => {
                    this.addMatchToModel(doc.data() as Match);
                })
                console.log("Matches synced, new match amount: ", this.matches.length);
            })
        });
    }
}