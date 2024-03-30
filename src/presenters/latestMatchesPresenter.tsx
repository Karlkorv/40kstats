import { observer } from "mobx-react-lite";
import React from "react";
import { LastestMatchesView } from "../views/latestMatchesView.tsx";
import { LeaderBoardModel } from "../model/LeaderboardModel";


const LatestMatches = observer(({ model }: { model: LeaderBoardModel }) => { // Update the type annotation for the model prop
    function syncClicked() {
        model.syncModel();
    }

    console.log("LatestMatches model.matches", model.matches)

    return (
        <div>
            <LastestMatchesView matches={model.matches} syncClicked={syncClicked} />
        </div>
    )
})

export { LatestMatches }