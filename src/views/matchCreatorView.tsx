import React from "react"
import { Match } from "../model/match.ts";
import { FACTIONS } from "../model/factions.ts"
import { Box, Button, ButtonGroup, FormControl, FormHelperText, Input, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
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
                        <InputLabel id={"player_"+num}>Player {num}</InputLabel>
                        <OutlinedInput
                            key={index}
                            id={"player_"+num}
                            label={"Player"+num}
                            type={type || "text"}
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
                            label={"Faction"+num}
                            value={faction_value}
                            autoComplete="off"
                            onChange={(e) => onListChange(e, index)}
                            onFocus={onFocus}
                            onBlur={(e) => onBlur(e, index)}
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
                        <InputLabel id={"player_"+index+"_primary_points"}>Primary Points</InputLabel>
                        <OutlinedInput
                            key={index}
                            type="text"
                            id={"player_"+index+"_primary_points"}
                            label="Primary Points"
                            value={p_points}
                            onChange={(e) => onPrimaryPointsChange(e, index)}
                        />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <InputLabel id={"player_"+index+"_secondary_points"}>Secondary Points</InputLabel>
                        <OutlinedInput
                            key={index}
                            type="text"
                            id={"player_"+index+"_secondary_points"}
                            label="Secondary Points"
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
                <Box sx={{paddingTop: 10/8}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={dayjs(date)} onChange={handleDateChangeACB} label="Match Date:"/>
                    </LocalizationProvider>
                </Box>

                {formInputValues.map((obj, index) => (
                    PlayerInput({ objValue: obj, onNameChange: handleNameChangeACB, index: index, deleteField: handleDeleteFieldACB, onListChange: handleListChangeACB, onFocus: handleFocusACB, onBlur: handleBlurACB, onPrimaryPointsChange: onPrimaryPointsChangeACB, onSecondaryPointsChange: onSecondaryPointsChangeACB })
                ))}

                <Box sx={{ minWidth: 120, maxWidth: 200}}>
                    <FormControl fullWidth>
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
                <Box sx={{paddingTop: 10/8}}>
                    <FormControl>
                        <InputLabel id="notes">Match Notes:</InputLabel>
                        <OutlinedInput
                            value={notes}
                            label="Match Notes"
                            type="text"
                            onChange={(e) => onNotesChangeACB(e)}
                        />
                    </FormControl>
                </Box>
            </form>
            <ButtonGroup variant="contained">
                <Button onClick={onClickAddPlayerACB}>Add player</Button>
                <Button onClick={onClickCreateMatchACB}>Create match</Button>
                <Button onClick={onClickCancelACB}>Cancel</Button>
            </ButtonGroup>
        </div>
    )
};