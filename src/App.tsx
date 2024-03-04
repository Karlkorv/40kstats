import React from "react";

export function App({ addToFirestore }) {
    function addCallbackACB(event) {
        addToFirestore(event.target.value);
    }
    return (
        <div>
            <input>
                <button onClick={addCallbackACB}>Add to Firestore</button>
            </input>
        </div>
    )
}