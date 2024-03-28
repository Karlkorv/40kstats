import { Match } from "./match.ts";
import { addMatchToFirestore, connectToFirestore } from "../firebase";
import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";

export class LeaderBoardModel {
    @observable currentMatchId: Date | undefined = undefined;
    ready: boolean = false;

    @observable fireStorePromiseState = {
        promise: undefined as Promise<any> | undefined,
        matches: undefined as Match[] | undefined,
        error: undefined,
    }

    constructor() {
        makeObservable(this);
        connectToFirestore(this);
    }

    @action resolvePromise(promise: Promise<any>, model) {
        console.log("Promise recieved")

        function dataRecievedACB(querySnapshot) {
            console.log("Data recieved: ", querySnapshot)
            querySnapshot.forEach(doc => {
                model.addMatchFromFirestore(doc.data() as Match)
            });
        }

        function errorACB(error) {
            console.error(error)
            model.fireStorePromiseState.error = error
        }

        model.fireStorePromiseState.promise = promise
        promise.then(dataRecievedACB).catch(errorACB)
    }

    @action addMatchFromFirestore(match: Match) {
        // Måste göra detta för att mobx ska fatta att arrayen uppdateras
        this.fireStorePromiseState.matches = [...this.fireStorePromiseState.matches, match]
    }

    @action addMatch(match: Match) {
        this.fireStorePromiseState.matches = [...this.fireStorePromiseState.matches, match]
        addMatchToFirestore(match)
    }

    getMatches(): Match[] {
        return this.fireStorePromiseState.matches
    }
}