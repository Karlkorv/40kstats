import React from "react"

export function MatchCreatorView(props) {
    function onClickCreateMatchACB(evt){
        props.createMatch();
    }
    function onClickCancelACB(){
        window.location.hash = "#/"
    }

    return (
        <div>
            <form>
                <label>Name of match</label>
            </form>
            <button onClick={onClickCreateMatchACB}>Create match</button>
            <button onClick={onClickCancelACB}>Cancel</button>
        </div>
    )
};