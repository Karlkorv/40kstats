import { firebaseConfig } from './firebaseConfig.ts';
import { initializeApp } from 'firebase/app';
import { Match } from './model/match.ts';
import { getAuth, User } from 'firebase/auth';
import { addDoc, setDoc, collection, getDoc, getFirestore, doc, query, orderBy, limit, getDocs, getCountFromServer, deleteDoc, where, writeBatch } from 'firebase/firestore';
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
        let match = model.DEFAULT_CREATE_MATCH;
        match.userID = model.user?.uid ?? '';
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
        points_total: match.points_total,
        userID: match.userID
    }

    console.log("Trying to add match: ", matchToAdd);

    return addDoc(matchRef, matchToAdd).then((doc) => {
        console.log("Match added to Firestore, id: ", doc.id);
        return doc.id;
    });
}

/*  Maybe unnecessary to send whole model as a parameter
    Might be sufficient to only send the User instance
 */
export function clearPersistence(model: LeaderBoardModel) {
    if (!model.user) {
        throw new Error("Tried to clear persistence without valid user.")
    } else {
        deleteDoc(doc(persistenceRef, model.user?.uid)).then(() => {
            console.log("Cleared persistence for user: ", model.user?.uid)
        })
    }
}

export function getUsername() {
    if (!auth.currentUser) {
        return Promise.resolve(null);
    }

    const userRef = collection(db, "users");

    return getDoc(doc(userRef, auth.currentUser.uid)).then((doc) => {
        if (!doc.exists) {
            return null;
        }
        console.log("Got username from firebase:", doc.data())
        return doc.data()!.username_display; // If the doc exists there will be a username
    })
}

export function addUserName(username: string) {
    // From https://fireship.io/lessons/custom-usernames-firebase/

    if (!auth.currentUser) {
        return Promise.reject("No user logged in");
    }

    const usernameDoc = doc(collection(db, "usernames"), username.toLowerCase());
    const userDoc = doc(collection(db, "users"), auth.currentUser.uid);

    const batch = writeBatch(db);

    console.log("Adding username: ", username);

    batch.set(usernameDoc, { uid: auth.currentUser.uid });
    batch.set(userDoc, { username_display: username, username: username.toLowerCase() });

    return batch.commit();
}

export function usernameIsValid(username: string) {
    const usernameRef = collection(db, "usernames");

    return getDoc(doc(usernameRef, username.toLowerCase())).then((doc) => {
        return !doc.exists;
    })
}