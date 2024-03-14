import { observer } from "mobx-react-lite";
import React  from "react";

const MatchCreator = observer(
    function MatchCreatorPresenter({model} : any){
        return (
            <div>
                Creating match.
            </div>
        )
    }
);

export { MatchCreator }