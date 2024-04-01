import React from "react"

export function MatchCreatorView(props) {
    function onClickCreateMatchACB(evt){
        props.createMatch();
    }
    function onClickCancelACB(){
        window.location.hash = "#/"
    }
    function onClickAddPlayerACB(){
        return (
            <div>
                <form>
                    <label htmlFor="mName">Player {}: </label>
                    <input type="text" id="mName" name="mName"/><br></br>
                </form>
            </div>
        )
    }

    return (
        <div>
            <form>
                <label> MatchID: {props.match.matchID} </label>
                <label htmlFor="mDate">Match Date: </label>
                <input type="date" id="mDate" name="mDate"/><br></br>

                <label htmlFor="mName">Player 1: </label>
                <input type="text" id="mName" name="mName"/><br></br>

                <label htmlFor="mName">Player 2: </label>
                <input type="text" id="mName" name="mName"/><br></br>
                <button onClick={onClickAddPlayerACB}>Add player</button>
            </form>
            <button onClick={onClickCreateMatchACB}>Create match</button>
            <button onClick={onClickCancelACB}>Cancel</button>
        </div>
    )
};