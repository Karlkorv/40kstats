import { observer } from "mobx-react-lite";
import { Match } from "../model/match.ts";
import React from "react";
import { MatchCreatorView } from "../views/matchCreatorView";
import { LeaderBoardModel } from "../model/LeaderboardModel.ts";
import { FACTIONS } from "../model/factions.ts";

const MatchCreator = observer(({ model }: { model: LeaderBoardModel }) => {
    const options = Object.values(FACTIONS);

    function createNewMatch() {
        let date = model.matchUnderCreation.date;
        let players = model.matchUnderCreation.formInputValues.map(
            ({ player_value }) => player_value
        );
        console.log(players);
        let factions = model.matchUnderCreation.formInputValues.map(
            ({ faction_value }) => faction_value
        );
        let winners = model.matchUnderCreation.winners;
        let p_points = model.matchUnderCreation.formInputValues.map(
            ({ p_points }) => p_points
        );
        let s_points = model.matchUnderCreation.formInputValues.map(
            ({ s_points }) => s_points
        );
        let userID = model.matchUnderCreation.userID;
        let notes = model.matchUnderCreation.notes;
        let matchID = model.matchUnderCreation.matchID;
        if (players.some((player) => player === "")) {
            alert("Please fill in all Players");
        }
        if (factions.some((faction) => faction === "")) {
            alert("Please fill in all Factions");
        }
        if (winners === "") {
            alert("Please pick the winner");
        }
        if (
            !(
                players.some((player) => player === "") ||
                factions.some((faction) => faction === "" || winners === "")
            )
        ) {
            model.addMatch(
                new Match(
                    players,
                    factions,
                    [winners],
                    p_points,
                    s_points,
                    date,
                    userID,
                    notes,
                    matchID
                )
            );
            window.location.hash = "";
            console.log("Match created");
        }
    }

    function handleCancelClick() {
        model.cancelMatchCreation();
    }

    function handlePlayerNameChange(e, index) {
        if (e.length > 20) {
            alert("Name too long!");
        } else {
            model.handlePlayerInputFieldChange(e, index);
        }
    }

    function handleFactionChange(value, index) {
        if (options.includes(value) || value === "") {
            model.handleFactionChange(value, index);
        }
    }

    function onPrimaryPointsChange(e, index) {
        if (
            !isNaN(Number(e.target.value)) &&
            Number(e.target.value) < Number.MAX_SAFE_INTEGER &&
            Number(e.target.value) > Number.MIN_SAFE_INTEGER
        ) {
            let newString = e.target.value;
            model.handlePrimaryPointsChange(newString, index);
        } else if (
            Number(e.target.value) >= Number.MAX_SAFE_INTEGER - 1 ||
            Number(e.target.value) <= Number.MIN_SAFE_INTEGER + 1
        ) {
            alert("Value too large!");
        } else {
            alert("Please enter an integer!");
        }
    }

    function onSecondaryPointsChange(e, index) {
        if (
            !isNaN(Number(e.target.value)) &&
            Number(e.target.value) < Number.MAX_SAFE_INTEGER &&
            Number(e.target.value) > Number.MIN_SAFE_INTEGER
        ) {
            let newString = e.target.value;
            model.handleSecondaryPointsChange(newString, index);
        } else if (
            Number(e.target.value) >= Number.MAX_SAFE_INTEGER - 1 ||
            Number(e.target.value) <= Number.MIN_SAFE_INTEGER + 1
        ) {
            alert("Value too large!");
        } else {
            alert("Please enter an integer!");
        }
    }

    function handleWinnerChange(e) {
        model.handleWinnerChange(e);
    }

    function handleWinnerFocus(e) {
        model.handleFocus(e);
        e.target.value = "";
    }

    function handleWinnerBlur(e) {
        if (e.target.value === "") {
            model.handleWinnerBlur(e);
        }
    }

    function handleNotesChange(e) {
        model.handleNotesChange(e);
    }

    function handleDateChange(e) {
        model.handleDateChange(e.$d);
    }

    return (
        <div>
            {
                <MatchCreatorView
                    formInputValues={model.matchUnderCreation.formInputValues}
                    user={model.user}
                    winners={model.matchUnderCreation.winners}
                    notes={model.matchUnderCreation.notes}
                    date={model.matchUnderCreation.date}
                    createNewMatch={createNewMatch}
                    handleCancelClick={handleCancelClick}
                    handlePlayerNameChange={handlePlayerNameChange}
                    handleFactionChange={handleFactionChange}
                    onPrimaryPointsChange={onPrimaryPointsChange}
                    onSecondaryPointsChange={onSecondaryPointsChange}
                    handleWinnerChange={handleWinnerChange}
                    handleWinnerFocus={handleWinnerFocus}
                    handleWinnerBlur={handleWinnerBlur}
                    handleNotesChange={handleNotesChange}
                    handleDateChange={handleDateChange}
                    usernames={model.usernames}
                ></MatchCreatorView>
            }
        </div>
    );
});

export { MatchCreator };
