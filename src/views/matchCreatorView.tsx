import React from "react"
import { Match } from "../model/match.ts";
import { FACTIONS } from "../model/factions.ts"
import { Box, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";


export function MatchCreatorView({ formInputValues, winners, notes, date, createNewMatch, handleCancelClick, onClickAddPlayer, onClickRemovePlayer, handlePlayerNameChange, handleFactionChange, handleFocus, handleBlur, onPrimaryPointsChange, onSecondaryPointsChange, handleWinnerChange, handleWinnerFocus, handleWinnerBlur, handleNotesChange, user, handleDateChange }) {

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

    const handleDateChangeACB = (e) => {
        handleDateChange(e);
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
                        <InputLabel id={"faction_"+num}>Faction {num}:</InputLabel>
                        <Select
                            key={index}
                            id={label}
                            labelId={"faction_"+num}
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
                <Box>
                    <FormControl>
                        <InputLabel id={"player_"+{index}+"_primary_points"}>Primary Points</InputLabel>
                        <Input
                            key={index}
                            type="text"
                            id={label}
                            value={p_points}
                            onChange={(e) => onPrimaryPointsChange(e, index)}
                        />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <InputLabel id={"player_"+{index}+"_secondary_points"}>Secondary Points</InputLabel>
                            <Input
                                key={index}
                                type="text"
                                id={label}
                                value={s_points}
                                onChange={(e) => onSecondaryPointsChange(e, index)}
                            />
                    </FormControl>
                </Box>
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
                <Box>
                    <InputLabel>Match date:</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={dayjs(date)} onChange={handleDateChangeACB}/>
                    </LocalizationProvider>
                </Box>

                {formInputValues.map((obj, index) => (
                    PlayerInput({ objValue: obj, onNameChange: handleNameChangeACB, index: index, deleteField: handleDeleteFieldACB, onListChange: handleListChangeACB, onFocus: handleFocusACB, onBlur: handleBlurACB, onPrimaryPointsChange: onPrimaryPointsChangeACB, onSecondaryPointsChange: onSecondaryPointsChangeACB })
                ))}

                <Box>
                    <FormControl>
                        <InputLabel id="winners">Winners:</InputLabel>
                        <Select
                            value={winners}
                            onInput={(e) => onWinnerChangeACB(e)}
                            onFocus={onWinnerFocusACB}
                            onBlur={(e) => onWinnerBlurACB(e)}
                        >
                            {formInputValues.map(({ num, player_value }) => { 
                                return (
                                    <MenuItem key={num} value={player_value}>{player_value}</MenuItem>
                                ) 
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <InputLabel id="notes">Match notes:</InputLabel>
                        <div className="notes-input">
                            <Input
                                value={notes}
                                type="text"
                                onChange={(e) => onNotesChangeACB(e)}
                            />
                        </div>
                    </FormControl>
                </Box>
            </form>
            <button onClick={onClickAddPlayerACB}>Add player</button>
            <button onClick={onClickCreateMatchACB}>Create match</button>
            <button onClick={onClickCancelACB}>Cancel</button>
        </div>
    )
};