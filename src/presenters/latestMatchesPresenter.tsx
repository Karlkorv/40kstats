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



    if (model.loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (model.error) {
        return (
            <div>
                Error: {model.error}
            </div>
        )
    }
    
    if (!(model.matches.length == 0)) {
        return (
            <div>
                <LastestMatchesView addDummyMatch={addDummyMatch} matches={model.getMatches().slice()} />
            </div>
        )
    }

    return (
        <div>
            No data
        </div>
    )
})

export { LatestMatches }