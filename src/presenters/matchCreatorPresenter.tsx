import { observer } from "mobx-react-lite";
import React  from "react";
import { MatchCreatorView } from "../views/matchCreatorView";

const MatchCreator = observer(
    function MatchCreatorPresenter({model} : any){
        function createNewMatch(match){
            return model.addMatch(match);
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

        return (
            <div>
                <MatchCreatorView 
                    formInputValues={model.matchUnderCreation.formInputValues} 
                    numOfPlayers={model.matchUnderCreation.numOfPlayers} 
                    focusedValue={model.matchUnderCreation.focusedValue} 
                    onClickAddPlayer={onClickAddPlayer} 
                    handlePlayerNameChange={handlePlayerNameChange}
                    handleFactionChange={handleFactionChange}
                    onClickRemovePlayer={onClickRemovePlayer}
                >

                </MatchCreatorView>
            </div>
        )
    }
);

export { MatchCreator }