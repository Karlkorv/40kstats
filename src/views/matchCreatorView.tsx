import React from "react"
import { Match } from "../model/match.ts";

export function MatchCreatorView(props) {
    const [formValues, setFormValues] : any = React.useState([
        {
            label: "mPlayer1",
            num: "1",
            type: "text",
            value: "",
        }, 
        {
            label: "mPlayer2",
            num: "2",
            type: "text",
            value: "",
        }
    ]);
    const [toggle, setToggle] = React.useState(false);
    const [numOfPlayers, setNumOfPlayers] = React.useState(3);
    const inputRef = React.useRef(3);
    const selectRef = React.useRef(2);

    function onClickCreateMatchACB(evt){
        let match = null;
        //props.addMatch();
        console.log("Creating Match")
    }

    function PlayerInput({objValue, onChange, index}){
        const { label, num, type, value } = objValue;
        return (
            <div className="player-input-group">
                <label htmlFor={label}>Player {num}:</label>
                <div className="player-input">
                    <input
                        key = {index}
                        type = {type || "text"}
                        id = {label}
                        value={value || ""}
                        onChange={(e) => onChange(e, index)}
                    />
                </div>
            </div>
        )
    }

    const onClickAddPlayerACB = (e) => {
        e.preventDefault();
        const values = [...formValues];
        let playerID = "mPlayer" + numOfPlayers;
        values.push({
            label: playerID,
            num: numOfPlayers,
            type: "text",
            value: "",
        });
        setFormValues(values);
        setNumOfPlayers(numOfPlayers+1);
        setToggle(false);
        console.log(numOfPlayers);
    }
    
    const handleChange = (e, index) => {
        const values = [...formValues];
        values[index].value=e.target.value;
        setFormValues(values);
    };

    function onClickCancelACB(){
        window.location.hash = "#/"
    }

    return (
        <div>
            <form>
                <label htmlFor="mDate">Match Date: </label>
                <input type="date" id="mDate" name="mDate" value={""}/><br></br>

                {formValues.map((obj, index) => (
                    PlayerInput({objValue:obj, onChange: handleChange, index: index})
                ))}
                
            </form>
            <button onClick={onClickAddPlayerACB}>Add player</button>
            <button onClick={onClickCreateMatchACB}>Create match</button>
            <button onClick={onClickCancelACB}>Cancel</button>
        </div>
    )
};