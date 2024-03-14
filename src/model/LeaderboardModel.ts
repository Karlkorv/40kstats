import { Match } from "./match";
import { FACTIONS } from "./factions";
import { addMatch, readMatches } from "../firebase";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";

const model = {
    matchesShown: 0,
    matches: [] as Match[],
    currentMatchId: undefined as number | undefined,
    dailyWeatherLocation: 0,
}

export {model}