import { Match } from "./Match";
import { FACTIONS } from "./factions";
import { addMatch, getMatches } from "../firebase";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";
import { makeObservable, observable } from "mobx";

const model = {
    matches: [] as Match[],
    currentMatchId: undefined as Date | undefined,
    
    addNewMatch(match: Match) {
        this.matches.push(match);
        addMatch(match);
    },
}

export function initializeModel() {
    console.log("Initializing local model");
    getMatches(10).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            model.matches.push(doc.data() as Match);
        })   
        console.log("Matches fetched");
     });
    
    console.log(model);

    return model;
}


export {model}