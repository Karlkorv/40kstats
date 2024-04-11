import { firebaseConfig } from './firebaseConfig.ts';
import { initializeApp } from 'firebase/app';
import { Match } from './model/match.ts';
import { getAuth } from 'firebase/auth';
import { addDoc, setDoc, collection, getDoc, getFirestore, doc, query, orderBy, limit, getDocs, getCountFromServer, deleteDoc } from 'firebase/firestore';
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const matchRef = collection(db, "matches");
const auth = getAuth(app);

export function getLatestMatches(amount: number) {
    const q = query(matchRef, orderBy("date", "desc"), limit(amount));
    return getDocs(q);
}

export function getAuthFromFirebase() {
    return auth;
}

export function getMatchById(matchId: string) {
    return getDoc(doc(db, "matches", matchId));
}

export function getTotalMatchesFromFirestore() {
    return getCountFromServer(matchRef).then((count) => {
        return count.data().count;
    })
}

export function addMatchToFirestore(match: Match) {
    if (match.matchID) {
        throw new Error("Match is already added to firestore");
    }

    const matchToAdd = {
        date: match.date,
        players: match.players,
        factions: match.factions,
        winners: match.winners,
        points_primary: match.points_primary,
        points_secondary: match.points_secondary,
        points_total: match.points_total
    }

    return addDoc(matchRef, matchToAdd).then((doc) => {
        console.log("Match added to Firestore, id: ", doc.id);
        return doc.id;
    });
}

export function deleteMatchFromFirestore(matchID){
    getDoc(doc(db, "matches", matchID)).then((doc) => deleteDoc(doc.ref));
}