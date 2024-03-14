import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import {Match} from "./model/Match.ts";
import {addDoc, collection, getDoc, getFirestore, doc} from 'firebase/firestore'; 
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const matchRef = collection(db, "matches");

export function addMatch(match: Match) {
    addDoc(collection(db, "matches"), match);
}

export function initializeModel() {
    
}

export function getMatches(amount: number) {

}