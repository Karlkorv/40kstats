import { observer } from "mobx-react-lite";
import { Match } from "../model/match.ts"
import React  from "react";
import { MatchCreatorView } from "../views/matchCreatorView";

const MatchCreator = observer(
    function MatchCreatorPresenter({model} : any){
        function createNewMatch(){
            let players = model.matchUnderCreation.formInputValues.map((player_value) => (player_value));
            let factions = model.matchUnderCreation.formInputValues.map((faction_value) => (faction_value));
            let winners = [];
            let p_points = model.matchUnderCreation.formInputValues.map((p_points) => (p_points));
            let s_points = model.matchUnderCreation.formInputValues.map((s_points) => (s_points));
            let match = new Match(players, factions, winners, p_points, s_points)
            model.addMatch(match);
            console.log("Match created")
        }

        function handleCancelClick(){
            model.cancelMatchCreation();
        }

        function handlePlayerNameChange(e, index){
            model.handlePlayerInputFieldChange(e, index);
        }

        function handleFactionChange(e, index){
            model.handleFactionChange(e, index);
        }

        function onClickAddPlayer() {
            model.addPlayerToForm();
        }

        function onClickRemovePlayer(){
            model.removePlayerFromForm();
        }

        function handleFocus(e){
            model.handleFocus(e);
            e.target.value="";
        }

        function handleBlur(e, index){
            if (e.target.value === '') { model.handleBlur(e, index);}
        }

        function onPrimaryPointsChange(e, index){
            console.log(e);
            if(!isNaN(Number(e.target.value))){
                let newString = e.target.value;
                model.handlePrimaryPointsChange(newString, index); 
            }
        }

        function onSecondaryPointsChange(e, index){
            console.log(e);
            console.log(Number(e.nativeEvent.data));
            if(!isNaN(Number(e.target.value))){
                let newString = e.target.value;
                model.handleSecondaryPointsChange(newString, index); 
            }
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
                >
                </MatchCreatorView>}
            </div>
        )
    }
);

export { MatchCreator }