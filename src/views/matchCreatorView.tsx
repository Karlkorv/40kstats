import React from "react"
import { Match } from "../model/match.ts";
import { FACTIONS } from "../model/factions.ts"

/*  Currently, the component state is handled and stored directly in the View.
    Maybe this should be handled in the Presenter instead, as per good MSV practice?
*/
export function MatchCreatorView(props) {
    const [formInputValues, setFormInputValues] : any = React.useState([
        {
            label: "mPlayer1",
            num: "1",
            type: "text",
            player_value: "",
            faction_value:""
        }, 
        {
            label: "mPlayer2",
            num: "2",
            type: "text",
            player_value: "",
            faction_value:""
        }
    ]);
    const [toggle, setToggle] = React.useState(false);
    const [numOfPlayers, setNumOfPlayers] = React.useState(3);
    const inputRef = React.useRef(3);
    const selectRef = React.useRef(2);
    const [focusedValue, setFocusedValue] = React.useState();

    function onClickCreateMatchACB(evt){
        let match = null;
        //props.addMatch();
        console.log("Creating Match")
    }

    function PlayerInput({objValue, onChange, index, deleteField, onListChange, onFocus, onBlur}){
        const { label, num, type, player_value, faction_value } = objValue;
        return (
            <div className="player-input-group">
                <label htmlFor={label}>Player {num}:</label>
                <div className="player-input">
                    <input
                        key = {index}
                        type = {type || "text"}
                        id = {label}
                        value={player_value || ""}
                        onChange={(e) => onChange(e, index)}
                    />
                </div>
                <label htmlFor={label}>Faction {num}:</label>
                <div className="faction-input">
                    <input
                        key={index}
                        list="factions"
                        id={label}
                        value={faction_value}
                        autoComplete="off"
                        onInput={(e) => onListChange(e, index)}
                        onFocus={onFocus}
                        onBlur={(e) => onBlur(e, index)}
                    />
                    <datalist id="factions">
                        {Object.values(FACTIONS).map((faction, index) => (
                        <option key={index} value={faction} />
                        ))}
                    </datalist>
                </div>
                { index >= 2 && <div><button onClick={(e) => deleteField(e)}>X</button></div> }
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
            player_value: "",
            faction_value: ""
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
        values[index].player_value=e.target.value;
        setFormInputValues(values);
    };

    const handleListChange = (e, index) => {
        const values = [...formInputValues];
        const inputVal = e.target.value;
        const options = Object.values(FACTIONS)
        if(options.includes(inputVal)) {values[index].faction_value=inputVal;}
        setFormInputValues(values);
        //e.target.blur();
    }

    const handleFocus = (e) => {
        setFocusedValue(e.target.value);
        e.target.value = '';
    }

    const handleBlur = (e, index) => {
        if (e.target.value === '') {
            const values = [...formInputValues];
            values[index].faction_value = focusedValue;
            setFormInputValues(values);
        }
    }

    function onClickCancelACB(){
        window.location.hash = "#/"
    }

    return (
        <div>
            <form>
                <label htmlFor="mDate">Match Date: </label>
                <input type="date" id="mDate" name="mDate" value={""}/><br></br>

                {formInputValues.map((obj, index) => (
                    PlayerInput({objValue:obj, onChange: handleChange, index: index, deleteField: handleDeleteField, onListChange: handleListChange, onFocus:handleFocus, onBlur: handleBlur})
                ))}
                
            </form>
            <button onClick={onClickAddPlayerACB}>Add player</button>
            <button onClick={onClickCreateMatchACB}>Create match</button>
            <button onClick={onClickCancelACB}>Cancel</button>
        </div>
    )
};