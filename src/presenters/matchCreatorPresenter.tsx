import { observer } from "mobx-react-lite";
import { Match } from "../model/match.ts"
import React from "react";
import { MatchCreatorView } from "../views/matchCreatorView";

const MatchCreator = observer(
    function MatchCreatorPresenter({model} : any){
        function createNewMatch(){
            let players = model.matchUnderCreation.formInputValues.map(({player_value}) => (player_value));
            console.log(players)
            let factions = model.matchUnderCreation.formInputValues.map(({faction_value}) => (faction_value));
            let winners = model.matchUnderCreation.winners;
            let p_points = model.matchUnderCreation.formInputValues.map(({p_points}) => (p_points));
            let s_points = model.matchUnderCreation.formInputValues.map(({s_points}) => (s_points));
            let notes = model.matchUnderCreation.notes;
            if(players.some((player) => (player === ""))) { alert("Please fill in all Players") }
            if(factions.some((faction) => (faction === ""))) { alert("Please fill in all Factions") }
            if(winners === "") { alert("Please pick the winner") }
            if(!(players.some((player) => (player === "")) || factions.some((faction) => (faction === "") || winners === ""))) { 
                model.addMatch(new Match(players, factions, winners, p_points, s_points, notes));
                console.log("Match created");
            }
        }

        function handleCancelClick() {
            model.cancelMatchCreation();
        }
      
        function handlePlayerNameChange(e, index){
            if(e.target.value.length > 20) { alert("Name too long!")}
            else {model.handlePlayerInputFieldChange(e, index);}
        }

        function handleFactionChange(e, index) {
            model.handleFactionChange(e, index);
        }

        function onClickAddPlayer() {
            model.addPlayerToForm();
        }

        function onClickRemovePlayer() {
            model.removePlayerFromForm();
        }

        function handleFocus(e) {
            model.handleFocus(e);
            e.target.value = "";
        }

        function handleBlur(e, index) {
            if (e.target.value === '') { model.handleBlur(e, index); }
        }

        function onPrimaryPointsChange(e, index){
            if(!isNaN(Number(e.target.value)) && Number(e.target.value) < Number.MAX_SAFE_INTEGER && Number(e.target.value) > Number.MIN_SAFE_INTEGER){
                let newString = e.target.value;
                model.handlePrimaryPointsChange(newString, index); 
            } else if(Number(e.target.value) >= Number.MAX_SAFE_INTEGER-1 || Number(e.target.value) <= Number.MIN_SAFE_INTEGER+1){
                alert("Value too large!")
            } else {
                alert("Please enter an integer!")
            }
        }

        function onSecondaryPointsChange(e, index){
            if(!isNaN(Number(e.target.value)) && Number(e.target.value) < Number.MAX_SAFE_INTEGER && Number(e.target.value) > Number.MIN_SAFE_INTEGER){
                let newString = e.target.value;
                model.handleSecondaryPointsChange(newString, index); 
            } else if (Number(e.target.value) >= Number.MAX_SAFE_INTEGER-1 || Number(e.target.value) <= Number.MIN_SAFE_INTEGER+1){
                alert("Value too large!")
            } else {
                alert("Please enter an integer!")
            }
        }

        function handleWinnerChange(e) {
            model.handleWinnerChange(e);
        }

        function handleWinnerFocus(e) {
            model.handleFocus(e)
            e.target.value = "";
        }

        function handleWinnerBlur(e) {
            if (e.target.value === '') { model.handleWinnerBlur(e); }
        }

        function handleNotesChange(e) {
            model.handleNotesChange(e);
        }
        

        return (
            <div>
                {<MatchCreatorView
                    formInputValues={model.matchUnderCreation.formInputValues}
                    numOfPlayers={model.matchUnderCreation.numOfPlayers}
                    focusedValue={model.matchUnderCreation.focusedValue}
                    winners={model.matchUnderCreation.winners}
                    primary_points={model.matchUnderCreation.primary_points}
                    secondary_points={model.matchUnderCreation.secondary_points}
                    notes={model.matchUnderCreation.notes}
                    createNewMatch={createNewMatch}
                    handleCancelClick={handleCancelClick}
                    onClickAddPlayer={onClickAddPlayer}
                    onClickRemovePlayer={onClickRemovePlayer}
                    handlePlayerNameChange={handlePlayerNameChange}
                    handleFactionChange={handleFactionChange}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    onPrimaryPointsChange={onPrimaryPointsChange}
                    onSecondaryPointsChange={onSecondaryPointsChange}
                    handleWinnerChange={handleWinnerChange}
                    handleWinnerFocus={handleWinnerFocus}
                    handleWinnerBlur={handleWinnerBlur}
                    loggedIn={model.loggedIn}
                    handleNotesChange={handleNotesChange}>
                </MatchCreatorView>}
            </div >
        )
    }
);

export { MatchCreator }