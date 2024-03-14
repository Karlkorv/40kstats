import { observer } from "mobx-react-lite";
import React  from "react";
import { MatchCreatorView } from "../views/matchCreatorView";

const MatchCreator = observer(
    function MatchCreatorPresenter({model} : any){
        function createNewMatch(match){
            return model.addMatch(match);
        }

        return (
            <div>
                <MatchCreatorView createMatch={createNewMatch}>

                </MatchCreatorView>
            </div>
        )
    }
);

export { MatchCreator }