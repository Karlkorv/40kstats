import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import {Match} from "./model/Match.ts";
import { addDoc, setDoc, collection, getDoc, getFirestore, doc, query, orderBy, limit, getDocs} from 'firebase/firestore'; 
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const matchRef = collection(db, "matches");

export function addMatch(match: Match) {
    // Potential bug here if the match already exists
    setDoc(doc(matchRef, match.date.toString()), match).then(() => {
        console.log("Match added:" + match.date.toString());
    });
}

export function getMatches(amount: number) {
    return getDocs(query(matchRef, orderBy("date", "desc"), limit(amount)))
}