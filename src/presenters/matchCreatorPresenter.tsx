import { observer } from "mobx-react-lite";
import { Match } from "../model/match.ts";
import React from "react";
import { MatchCreatorView } from "../views/matchCreatorView";
import { LeaderBoardModel } from "../model/LeaderboardModel.ts";
import { FACTIONS } from "../model/factions.ts";

const MatchCreator = observer(({ model }: { model: LeaderBoardModel }) => {
    const options = Object.values(FACTIONS);
    const userDuplicate : boolean = (model.matchUnderCreation.formInputValues[0].player_value === model.matchUnderCreation.formInputValues[1].player_value);
    const usernameWrongLength : boolean = (
        model.matchUnderCreation.formInputValues[0].player_value.length < 3 || 
        model.matchUnderCreation.formInputValues[0].player_value.length > 20 ||
        model.matchUnderCreation.formInputValues[1].player_value.length < 3 || 
        model.matchUnderCreation.formInputValues[1].player_value.length > 20
    );
    const players = model.matchUnderCreation.formInputValues.map(
        ({ player_value }) => player_value
    );
    const factions = model.matchUnderCreation.formInputValues.map(
        ({ faction_value }) => faction_value
    );

    const invalidInput : boolean = (
        players.some((player) => player === "") ||
        factions.some((faction) => faction === FACTIONS.SELECT_FACTION || faction === "" || winners === "") ||
        userDuplicate ||
        usernameWrongLength
    )

    function createNewMatch() {
        let date = model.matchUnderCreation.date;
        let players = model.matchUnderCreation.formInputValues.map(
            ({ player_value }) => player_value
        );
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
        if (factions.some((faction) => faction === FACTIONS.SELECT_FACTION || faction === "")) {
            alert("Please fill in all Factions");
        }
        if (winners === "") {
            alert("Please pick the winner");
        }
        if (userDuplicate){
            alert("Please pick unique player names.")
        }
        if (!invalidInput) {
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

    function overwriteFromPersistence() {
        model.overwriteFromPersistence();
    }

    function handlePlayerNameChange(e, index) {
        model.handlePlayerInputFieldChange(e, index);
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

    function clearModelPersistence() {
        model.clearPersistenceData();
    }

    function handleDateChange(e) {
        model.handleDateChange(e.$d);
    }

    return (
        <div>
            {
                <MatchCreatorView
                    connected={model.connected}
                    persistenceData={model.persistenceData}
                    formInputValues={model.matchUnderCreation.formInputValues}
                    user={model.user}
                    winners={model.matchUnderCreation.winners}
                    notes={model.matchUnderCreation.notes}
                    date={model.matchUnderCreation.date}
                    overwriteFromPersistence={overwriteFromPersistence}
                    clearPersistence={clearModelPersistence}
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
                    userDuplicate={userDuplicate}
                    invalidInput={invalidInput}
                ></MatchCreatorView>
            }
        </div>
    );
});

export { MatchCreator };
