import React from "react"
import { Match } from "../model/match.ts";

export function MatchCreatorView(props) {
    let numOfPlayers = 2;
    function onClickCreateMatchACB(evt){
        let match = null;
        //props.addMatch();
        console.log("Creating Match")
    }
    function onClickCancelACB(){
        window.location.hash = "#/"
    }
    function onClickAddPlayerACB(){
        numOfPlayers++;
        let playerID = "mPlayer" + numOfPlayers;
        return (
            <div>
                <form>
                    <label htmlFor="mName">Player {numOfPlayers}: </label>
                    <input type="text" id="${playerID}" name="${playerID}"/><br></br>
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
                <input type="text" id="mPlayer1" name="mPlayer1"/><br></br>

                <label htmlFor="mName">Player 2: </label>
                <input type="text" id="mPlayer2" name="mPlayer2"/><br></br>
                <button onClick={onClickAddPlayerACB}>Add player</button>
            </form>
            <button onClick={onClickCreateMatchACB}>Create match</button>
            <button onClick={onClickCancelACB}>Cancel</button>
        </div>
    )
};