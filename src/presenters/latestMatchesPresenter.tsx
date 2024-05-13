import { observer } from "mobx-react-lite";
import React from "react";
import { FACTIONS } from "../model/factions";
import { LastestMatchesView } from "../views/LatestMatchesView";
import { LeaderBoardModel } from "../model/LeaderboardModel";
import { Match } from "../model/match";

const LatestMatches = observer(({ model }: { model: LeaderBoardModel }) => {
    function matchClicked(match: Match) {
        if (!match.matchID) {
            console.error("Match does not have an id");
            return;
        }
        window.location.hash = "#/match/" + match.matchID;
    }

    function loadMoreMatches(amt?: number) {
        model.getMoreMatches(amt);
    }

    if (model.loading) {
        return <div>Loading...</div>;
    }

    if (model.error) {
        return <div>Error: {model.error}</div>;
    }

    if (!(model.matches.length == 0)) {
        return (
            <div>
                <LastestMatchesView
                    matchClicked={matchClicked}
                    matches={model.getMatches()}
                    moreMatches={loadMoreMatches}
                    totalMatches={model.totalMatches}
                    user={model.user}
                />
            </div>
        );
    }

    return <div>No data</div>;
});

export { LatestMatches };
