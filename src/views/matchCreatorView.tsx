import React from "react"
import { Match } from "../model/match.ts";
import { FACTIONS } from "../model/factions.ts"

/*  Currently, the component state is handled and stored directly in the View.
    Maybe this should be handled in the Presenter instead, as per good MSV practice?
*/
export function MatchCreatorView({formInputValues, numOfPlayers, focusedValue, onClickAddPlayer, handlePlayerNameChange, handleFactionChange, onClickRemovePlayer}) {

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
                        required
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
                        required
                    />
                    {/* TODO
                        See if there is any way to not have to create a new list 
                        for every Player Input, so that they can share the same <datalist>
                    */}
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

    const onClickAddPlayerACB = () => {
        onClickAddPlayer();
    }

    const handleDeleteField = () => {
        onClickRemovePlayer();
    }
    
    const handleNameChangeACB = (e, index) => {
        handlePlayerNameChange(e, index);
    };

    const handleListChangeACB = (e, index) => {
        handleFactionChange(e, index);
        //setFormInputValues(values);
        //e.target.blur();
    }

    const handleFocusACB = (e) => {
        //setFocusedValue(e.target.value);
        e.target.value = '';
    }

    const handleBlurACB = (e, index) => {
        if (e.target.value === '') {
            const values = [...formInputValues];
            values[index].faction_value = focusedValue;
            //setFormInputValues(values);
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
                    PlayerInput({objValue:obj, onChange: handleNameChangeACB, index: index, deleteField: handleDeleteField, onListChange: handleListChangeACB, onFocus:handleFocusACB, onBlur: handleBlurACB})
                ))}
                
                <div>
                    <label htmlFor="winners">Winners:</label>
                    <div className="winners-input">
                        <input
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="primary-points">Primary points</label>
                    <div className="primary-points-input">
                        <input

                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="secondary-points">Secondary points</label>
                    <div className="secondary-points-input">
                        <input
                            
                        />
                    </div>
                </div>
            </form>
            <button onClick={onClickAddPlayerACB}>Add player</button>
            <button onClick={onClickCreateMatchACB}>Create match</button>
            <button onClick={onClickCancelACB}>Cancel</button>
        </div>
    )
};