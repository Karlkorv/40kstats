import React from "react"
import { Match } from "../model/match.ts";
import { FACTIONS } from "../model/factions.ts"
import { Box, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from "@mui/material";

export function MatchCreatorView({ formInputValues, winners, notes, createNewMatch, handleCancelClick, onClickAddPlayer, onClickRemovePlayer, handlePlayerNameChange, handleFactionChange, handleFocus, handleBlur, onPrimaryPointsChange, onSecondaryPointsChange, handleWinnerChange, handleWinnerFocus, handleWinnerBlur, handleNotesChange, user }) {

    function onClickCreateMatchACB(evt) {
        createNewMatch();
        console.log("Creating Match");
    }
    function onClickCancelACB() {
        handleCancelClick();
        window.location.hash = "#/"
    }

    const onClickAddPlayerACB = () => {
        onClickAddPlayer();
    }

    const handleDeleteFieldACB = () => {
        onClickRemovePlayer();
    }

    const handleNameChangeACB = (e, index) => {
        handlePlayerNameChange(e, index);
    };

    const handleListChangeACB = (e, index) => {
        handleFactionChange(e, index);
    }

    const handleFocusACB = (e) => {
        handleFocus(e);
    }

    const handleBlurACB = (e, index) => {
        handleBlur(e, index);
    }


    function onPrimaryPointsChangeACB(e, index) {
        onPrimaryPointsChange(e, index);
    }

    function onSecondaryPointsChangeACB(e, index) {
        onSecondaryPointsChange(e, index);
    }

    function onWinnerChangeACB(e) {
        handleWinnerChange(e);
    }

    function onWinnerFocusACB(e) {
        handleWinnerFocus(e);
    }

    function onWinnerBlurACB(e) {
        handleWinnerBlur(e);
    }

    function onNotesChangeACB(e) {
        handleNotesChange(e);
    }

    function PlayerInput({ objValue, onNameChange, index, deleteField, onListChange, onFocus, onBlur, onPrimaryPointsChange, onSecondaryPointsChange }) {
        const { label, num, type, player_value, faction_value, p_points, s_points } = objValue;
        return (
            <div className="player-input-group">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl>
                        <InputLabel required={true}>Player {num}:</InputLabel>
                            <Input
                                key={index}
                                type={type || "text"}
                                id={label}
                                value={player_value || ""}
                                onChange={(e) => onNameChange(e, index)}
                            />
                            <FormHelperText id={"player" + player_value}></FormHelperText>
                    </FormControl>
                </Box>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id={"faction"+num}>Faction {num}:</InputLabel>
                        <Select
                            key={index}
                            id={label}
                            labelId={"faction"+num}
                            label="Faction"
                            value={faction_value}
                            autoComplete="off"
                            onChange={(e) => onListChange(e, index)}
                            onFocus={onFocus}
                            onBlur={(e) => onBlur(e, index)}
                            notched={true}
                        >   
                            <MenuItem key={0} value="">None</MenuItem>
                            {/* TODO
                                See if there is any way to not have to create a new list 
                                for every Player Input, so that they can share the same <datalist>
                            */}
                            {Object.values(FACTIONS).map((faction, index) => (
                                <MenuItem key={index} value={faction}>{faction}</MenuItem>
                            ))}
                        </Select>
    
                    </FormControl>
                </Box>
                <div>
                    <label htmlFor="primary-points">Primary points</label>
                    <div className="primary-points-input">
                        <input
                            key={index}
                            type="text"
                            value={p_points}
                            onChange={(e) => onPrimaryPointsChange(e, index)}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="secondary-points">Secondary points</label>
                    <div className="secondary-points-input">
                        <input
                            key={index}
                            type="text"
                            value={s_points}
                            onChange={(e) => onSecondaryPointsChange(e, index)}
                        />
                    </div>
                </div>
                {index >= 2 && <div><button onClick={(e) => deleteField(e)}>X</button></div>}
            </div>
        )
    }

    if (!user) {
        return (
            <div>
                <span>You need to be logged in to create a match</span>
            </div>
        )
    }

    return (
        <div>
            <form>
                <label htmlFor="mDate">Match Date: </label>
                <input type="date" id="mDate" name="mDate" value={""} /><br></br>

                {formInputValues.map((obj, index) => (
                    PlayerInput({ objValue: obj, onNameChange: handleNameChangeACB, index: index, deleteField: handleDeleteFieldACB, onListChange: handleListChangeACB, onFocus: handleFocusACB, onBlur: handleBlurACB, onPrimaryPointsChange: onPrimaryPointsChangeACB, onSecondaryPointsChange: onSecondaryPointsChangeACB })
                ))}

                <div>
                    <label htmlFor="winners">Winners:</label>
                    <div className="winners-input">
                        <input
                            value={winners}
                            list="player_list"
                            onInput={(e) => onWinnerChangeACB(e)}
                            onFocus={onWinnerFocusACB}
                            onBlur={(e) => onWinnerBlurACB(e)}
                        />
                        <datalist id="player_list">
                            {formInputValues.map(({ num, player_value }) => { return (<option key={num} value={player_value} />) })}
                        </datalist>
                    </div>
                </div>
                <div className="notes">
                    <label htmlFor="notes">Match notes:</label>
                    <div className="notes-input">
                        <input
                            placeholder="Match notes"
                            value={notes}
                            type="text"
                            onChange={(e) => onNotesChangeACB(e)}
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