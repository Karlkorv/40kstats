import { firebaseConfig } from './firebaseConfig.ts';
import { initializeApp } from 'firebase/app';
import { Match } from './model/match.ts';
import { getAuth } from 'firebase/auth';
import { getDatabase, onDisconnect, onValue, ref } from "firebase/database"
import { addDoc, setDoc, collection, getDoc, getFirestore, doc, query, orderBy, limit, getDocs, getCountFromServer, deleteDoc, updateDoc, initializeFirestore, writeBatch } from 'firebase/firestore';
import { LeaderBoardModel } from './model/LeaderboardModel.ts';
import { runInAction } from 'mobx';
import { DEFAULT_CREATE_MATCH, MatchCreatorInput } from './model/FormModel.ts';
// Initialize Firebase

const app = initializeApp(firebaseConfig);
initializeFirestore(app, {
    ignoreUndefinedProperties: true,
});
const db = getFirestore(app);
const matchRef = collection(db, "matches");
const persistenceRef = collection(db, "persistence");
export const connectionRef = ref(getDatabase(), ".info/connected");
export const auth = getAuth(app);

export function getLatestMatches(amount: number) {
    const q = query(matchRef, orderBy("date", "asc"), limit(amount));
    return getDocs(q);
}

export function modelToPersistence(model: LeaderBoardModel) {
    return { ...model.matchUnderCreation };
}

export function persistenceToModel(persistence: any, model: LeaderBoardModel) {
    if (!persistence) {
        let match = DEFAULT_CREATE_MATCH;
        match.userID = model.user?.uid ?? '';
        model.setMatchUnderCreation(DEFAULT_CREATE_MATCH);
        return;
    }

    persistence.date = persistence.date.toDate()

    model.readFromPersistence(persistence);
}

export function saveToFirebase(model: LeaderBoardModel) {
    if (!model.ready || !model.user) {
        return;
    }

    setDoc(doc(persistenceRef, model.user.uid), modelToPersistence(model)).then(() => {
        model.logPersistenceWrite();
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
    watchFunction(() => model.matchUnderCreation, () => {
        if (isInvalidMatch(model.matchUnderCreation)) {
            return;
        }
        model.startPersistenceWrite();
        saveToFirebase(model)
    });
    auth.onAuthStateChanged((user) => {
        if (!user) {
            model.userLoggedOut();
        }
        model.setUser(user);
        loadFromFirebase(model);
    });
}

function isInvalidMatch(match: MatchCreatorInput) {
    return match.notes == "" && match.winners == "" &&
        match.formInputValues[0].p_points == 0 &&
        match.formInputValues[0].s_points == 0 &&
        match.formInputValues[1].p_points == 0 &&
        match.formInputValues[1].p_points == 0 &&
        match.formInputValues[0].player_value == "" &&
        match.formInputValues[1].player_value == ""
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

    const matchToAdd = {
        date: match.date,
        players: match.players,
        factions: match.factions,
        winners: match.winners,
        points_primary: match.points_primary,
        points_secondary: match.points_secondary,
        points_total: match.points_total,
        userID: match.userID,
        matchID: match.matchID
    }

    if (match.matchID !== undefined) {
        console.log("Updating existing match!")
        return updateDoc(doc(db, "matches", match.matchID), matchToAdd).then(() => {
            return match.matchID;
        });

    } else {
        console.log("Trying to add match: ", matchToAdd);

        return addDoc(matchRef, matchToAdd).then((doc) => {
            console.log("Match added to Firestore, id: ", doc.id);
            return doc.id;
        });
    }

}

export function deleteMatchFromFirestore(matchID) {
    getDoc(doc(db, "matches", matchID)).then((doc) => deleteDoc(doc.ref));
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

export function getUsernames() {
    const userRef = collection(db, "users")

    const q = query(userRef)
    return getDocs(q).then((snapshot) => {
        const usernames: string[] = []
        snapshot.forEach((doc) => {
            usernames.push(doc.data().username_display)
        })
        return usernames
    })
}

export function getUsername() {
    if (!auth.currentUser) {
        return Promise.resolve(null);
    }

    const userRef = collection(db, "users");

    return getDoc(doc(userRef, auth.currentUser.uid)).then((doc) => {
        if (!doc.exists()) {
            return null;
        }
        try {
            return doc.data()!.username_display;
        } catch (error) {
            console.log("Error: No username: ", error);
            return "";
        }
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

export function userExists(username: string) {
    const usernameRef = collection(db, "usernames");

    return getDoc(doc(usernameRef, username.toLowerCase())).then((doc) => {
        return doc.exists();
    })
}