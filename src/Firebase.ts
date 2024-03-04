import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import {addDoc, collection, getFirestore} from 'firebase/firestore'; 
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function addToFirestore(name) {
    addDoc(collection(db, "test"), {name: name}).then(() => {
        console.log("Document successfully written!");
    });
}