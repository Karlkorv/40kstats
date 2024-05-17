import { observer } from "mobx-react-lite";
import React from "react";
import { LastestMatchesView } from "../views/LatestMatchesView";
import { LeaderBoardModel } from "../model/LeaderboardModel";

const LatestMatches = observer(({ model }: { model: LeaderBoardModel }) => {
    function matchClicked(id: string) {
        if (!model.matches.find((match) => match.matchID === id)) {
            console.error("Match does not exist.");
            return;
        }
        window.location.hash = "#/match/" + id;
    }

    function loadMoreMatches(amt?: number) {
        model.getMoreMatches(amt);
    }

    function toggleUserFilter(){
        model.toggleUserFilter();
    }

    function togglePlayerFilter(){
        model.togglePlayerFilter();
    }

    function handleSearchInput(e){
        model.handleSearchInput(e);
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
                    userFilter={model.userFilter}
                    toggleUserFilter={toggleUserFilter}
                    playerFilter={model.playerFilter}
                    togglePlayerFilter={togglePlayerFilter}
                    handleSearchInput={handleSearchInput}
                />
            </div>
        );
    }

    return <div>No data</div>;
});

export { LatestMatches };
