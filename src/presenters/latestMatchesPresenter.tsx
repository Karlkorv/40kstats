import { observer } from "mobx-react-lite";
import React from "react";
import { FACTIONS } from "../model/factions";
import { LastestMatchesView } from "../views/LatestMatchesView";
import { LeaderBoardModel } from "../model/LeaderboardModel";
import { Match } from "../model/match";


const LatestMatches = observer(({ model }: { model: LeaderBoardModel }) => { // Update the type annotation for the model prop
    function addDummyMatch() {
        model.addMatch(new Match(
            ["Janne", "Johan"],
            [FACTIONS.ADEPTUS_MECHANICUS, FACTIONS.AELDARI],
            ["Janne"],
            [10, 0], [0, 0])
        );
    }

    const promiseState = model.fireStorePromiseState

    if (!promiseState.promise) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (promiseState.error) {
        return (
            <div>
                Error: {promiseState.error}
            </div>
        )
    }

    if (promiseState.matches) {
        return (
            <div>
                <LastestMatchesView addDummyMatch={addDummyMatch} matches={model.getMatches()} />
            </div>
        )
    }
})

export { LatestMatches }