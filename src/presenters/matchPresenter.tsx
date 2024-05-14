import { observer } from "mobx-react-lite";
import React from "react";
import { MatchView } from "../views/matchView.tsx";
import { Match } from "../model/match.ts";
import { LeaderBoardModel } from "../model/LeaderboardModel.ts";
import { useParams } from "react-router-dom";
import { matchToMatchCreatorInput } from "../model/FormModel.ts";

const MatchPresenter = observer(({ model }: { model: LeaderBoardModel }) => {
    const { matchId } = useParams();
    if (matchId != "matchNotFound") {
        model.setCurrentMatchById(matchId!);
    }

    function renderMetaInfo() {
        if (!model.currentMatch) return;
        return (
            <div>
                <meta
                    property="og:title"
                    content={
                        model.currentMatch?.players.join(" vs ") +
                        " match on " +
                        model.currentMatch.date.toISOString().substring(0, 10)
                    }
                />
                <meta
                    property="og:description"
                    content={
                        model.currentMatch.winners[0] +
                        " won!\n" +
                        model.currentMatch.players[0] +
                        " as " +
                        model.currentMatch.factions[0] +
                        ", " +
                        model.currentMatch.players[1] +
                        " as " +
                        model.currentMatch.factions[1]
                    }
                />
            </div>
        );
    }

    function deleteMatch(matchID) {
        if (matchID != model.currentMatch?.matchID) {
            throw new Error(
                "Trying to delete different match than the currently focused match."
            );
        }
        if (model.user?.uid != model.currentMatch?.userID) {
            alert("You can only delete matches created by you.");
        } else {
            model.deleteMatch(matchID);
            window.location.hash = "#/";
            console.log("Deleting match with ID: " + matchID);
        }
    }

    function editMatch(match: Match) {
        model.editMatch(matchToMatchCreatorInput(match));
        window.location.hash = "#/matchCreator";
    }

    console.log(
        "Rendering match presenter, current match: " + model.currentMatch
    );

    if (model.gettingCurrentMatch) {
        console.log("Rendering loading");
        return <div>Loading...</div>;
    }
    if (!model.currentMatch) {
        console.log("Match not found, rendering error");
        return <div>Match not found</div>;
    }

    return (
        <div>
            {renderMetaInfo()}
            <MatchView
                match={model.currentMatch}
                deleteMatch={deleteMatch}
                editMatch={editMatch}
            />
        </div>
    );
});

export { MatchPresenter };
