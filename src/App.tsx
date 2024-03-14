import React from "react";

export function App({model : LeaderboardModel}) {
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