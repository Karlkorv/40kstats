import { observer } from "mobx-react-lite";
import React  from "react";
import { MatchCreatorView } from "../views/matchCreatorView";

const MatchCreator = observer(
    function MatchCreatorPresenter({model} : any){
        function createNewMatch(match){
            return model.addMatch(match);
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

        function onPrimaryPointsChange(e){
            console.log(e);
            if(!isNaN(Number(e.target.value))){
                let newString = e.target.value;
                model.handlePrimaryPointsChange(newString); 
            }
        }

        function onSecondaryPointsChange(e){
            console.log(e);
            console.log(Number(e.nativeEvent.data));
            if(!isNaN(Number(e.target.value))){
                let newString = e.target.value;
                model.handleSecondaryPointsChange(newString); 
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