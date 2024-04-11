import { firebaseConfig } from './firebaseConfig.ts';
import { initializeApp } from 'firebase/app';
import { Match } from './model/match.ts';
import { getAuth } from 'firebase/auth';
import { addDoc, setDoc, collection, getDoc, getFirestore, doc, query, orderBy, limit, getDocs, getCountFromServer } from 'firebase/firestore';
import { LeaderBoardModel } from './model/LeaderboardModel.ts';
import { runInAction } from 'mobx';
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const matchRef = collection(db, "matches");
const persistenceRef = collection(db, "persistence");
export const auth = getAuth(app);

export function getLatestMatches(amount: number) {
    const q = query(matchRef, orderBy("date", "desc"), limit(amount));
    return getDocs(q);
}

export function modelToPersistence(model: LeaderBoardModel) {
    return model.matchUnderCreation;
}

export function persistenceToModel(persistence: any, model: LeaderBoardModel) {
    if (!persistence) {
        model.setMatchUnderCreation(model.DEFAULT_CREATE_MATCH);
        return;
    }

    model.setMatchUnderCreation(persistence);
}

export function saveToFirebase(model: LeaderBoardModel) {
    if (!model.ready || !model.user) {
        return;
    }

    setDoc(doc(persistenceRef, model.user.uid), modelToPersistence(model)).then(() => {
        console.log("Persistence written to firebase")
    });
}

export function loadFromFirebase(model: LeaderBoardModel) {
    model.ready = false;
    if (!model.user) {
        console.log("Tried to read persistence from firebase without user")
        return;
    }

    getDoc(doc(persistenceRef, model.user.uid)).then((doc) => {
        persistenceToModel(doc.data(), model);
        console.log("Persistence read from firebase")
    }).then(() => {
        model.ready = true;
    });
}

export function connectToFirebase(model: LeaderBoardModel, watchFunction) {
    watchFunction(() => model.matchUnderCreation, () => saveToFirebase(model));
    auth.onAuthStateChanged((user) => {
        if (!user) {
            model.userLoggedOut();
        }
        model.setUser(user);
        loadFromFirebase(model);
    });
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