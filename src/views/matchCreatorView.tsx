import React from "react"
import { Match } from "../model/match.ts";

export function MatchCreatorView(props) {
    const [formInputValues, setFormInputValues] : any = React.useState([
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

    function PlayerInput({objValue, onChange, index, deleteField}){
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
                    { index >= 2 &&
                        <div>
                        <button onClick={(e) => deleteField(e)}>X</button>
                    </div>
                    }
                </div>
            </div>
        )
    }

    const onClickAddPlayerACB = (e) => {
        e.preventDefault();
        const values = [...formInputValues];
        let playerID = "mPlayer" + numOfPlayers;
        values.push({
            label: playerID,
            num: numOfPlayers,
            type: "text",
            value: "",
        });
        setFormInputValues(values);
        setNumOfPlayers(numOfPlayers+1);
        setToggle(false);
        console.log(numOfPlayers);
    }

    const handleDeleteField = (e) => {
        e.preventDefault();
        const values = [...formInputValues];
        values.splice(values.length-1, 1);
        setNumOfPlayers(numOfPlayers-1)
        setFormInputValues(values);
    }
    
    const handleChange = (e, index) => {
        const values = [...formInputValues];
        values[index].value=e.target.value;
        setFormInputValues(values);
    };

    function onClickCancelACB(){
        window.location.hash = "#/"
    }

    return (
        <div>
            <form>
                <label htmlFor="mDate">Match Date: </label>
                <input type="date" id="mDate" name="mDate" value={""}/><br></br>

                {formInputValues.map((obj, index) => (
                    PlayerInput({objValue:obj, onChange: handleChange, index: index, deleteField: handleDeleteField})
                ))}
                
            </form>
            <button onClick={onClickAddPlayerACB}>Add player</button>
            <button onClick={onClickCreateMatchACB}>Create match</button>
            <button onClick={onClickCancelACB}>Cancel</button>
        </div>
    )
};