import { FACTIONS, FACTIONS_ARRAY } from "../model/factions.ts";
import {
    Autocomplete,
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

export function MatchCreatorView({
    connected,
    persistenceData,
    formInputValues,
    winners,
    notes,
    date,
    overwriteFromPersistence,
    clearPersistence,
    createNewMatch,
    handleCancelClick,
    handlePlayerNameChange,
    handleFactionChange,
    onPrimaryPointsChange,
    onSecondaryPointsChange,
    handleWinnerChange,
    handleWinnerFocus,
    handleWinnerBlur,
    handleNotesChange,
    user,
    handleDateChange,
    usernames,
    userDuplicate,
    invalidInput,
    usernameWrongLength,
    playerFactions,
    playerNames
}) {

    function onClickCreateMatchACB(evt) {
        createNewMatch();
    }
    function onClickCancelACB() {
        handleCancelClick();
        window.location.hash = "#/";
    }

    function overwriteFromPersistenceACB() {
        overwriteFromPersistence();
    }

    function clearPersistenceACB() {
        clearPersistence();
    }

    const handleNameChangeACB = (value, index) => {
        handlePlayerNameChange(value, index);
    };

    const handleListChangeACB = (value, index) => {
        handleFactionChange(value, index);
    };

    const handleDateChangeACB = (e) => {
        handleDateChange(e);
    };

    function handlePointsButtonClick(
        amount: number,
        index: number,
        primary: boolean
    ) {
        if (primary) {
            amount =
                formInputValues[index].p_points + amount < 0
                    ? 0
                    : amount + formInputValues[index].p_points;
            onPrimaryPointsChange({ target: { value: amount } }, index);
        } else {
            amount =
                formInputValues[index].s_points + amount < 0
                    ? 0
                    : amount + formInputValues[index].s_points;
            onSecondaryPointsChange({ target: { value: amount } }, index);
        }
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

    function renderPoints(isPrimary: boolean, index: number) {
        return (
            <FormControl>
                <div className="points-box">
                    <ButtonGroup>
                        <Button
                            className="points-button"
                            size="small"
                            variant="outlined"
                            disabled={isPrimary ? formInputValues[index].p_points <= 0 : formInputValues[index].s_points <= 0}
                            onClick={() =>
                                handlePointsButtonClick(-1, index, isPrimary)
                            }
                        >
                            -1
                        </Button>
                    </ButtonGroup>
                    <OutlinedInput
                        sx={{ maxWidth: 100 }}
                        key={index}
                        type="text"
                        id={
                            "player_" + index + isPrimary
                                ? "_primary_points"
                                : "_secondary_points"
                        }
                        value={
                            isPrimary
                                ? formInputValues[index].p_points
                                : formInputValues[index].s_points
                        }
                        onChange={(e) =>
                            isPrimary
                                ? onPrimaryPointsChangeACB(e, index)
                                : onSecondaryPointsChangeACB(e, index)
                        }
                    />
                    <ButtonGroup>
                        <Button
                            className="points-button"
                            variant="outlined"
                            onClick={() =>
                                handlePointsButtonClick(1, index, isPrimary)
                            }
                        >
                            +1
                        </Button>
                        <Button
                            variant="outlined"
                            className="points-button"
                            onClick={() =>
                                handlePointsButtonClick(3, index, isPrimary)
                            }
                        >
                            +3
                        </Button>
                        <Button
                            variant="outlined"
                            className="points-button"
                            onClick={() =>
                                handlePointsButtonClick(5, index, isPrimary)
                            }
                        >
                            +5
                        </Button>
                    </ButtonGroup>
                </div>
            </FormControl>
        );
    }

    function renderSyncAlert(persistenceData) {
        if (persistenceData.oldMatch) {
            return (
                <div>
                    <Dialog open={persistenceData.oldMatch}>
                        <DialogContent>
                            <Typography>
                                Found an unfinished match, overwrite current
                                match?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={overwriteFromPersistenceACB}>
                                Yes
                            </Button>
                            <Button onClick={clearPersistenceACB}>No</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }

        if (persistenceData.writing) {
            return (
                <div id="syncingAlert">
                    <CircularProgress
                        style={{ padding: "10px", color: "gray" }}
                    />
                    <Typography style={{ color: "gray" }}>
                        Syncing...
                    </Typography>
                </div>
            );
        }

        if (!persistenceData.lastWritten) {
            return (
                <div id="syncingAlert">
                    <Typography>Not synced</Typography>
                </div>
            );
        }

        const lastSyncedAgo = dayjs().diff(
            persistenceData.lastWritten,
            "minutes"
        );

        return (
            <div id="syncingAlert">
                <Typography>
                    Last synced: {lastSyncedAgo} minutes ago
                </Typography>
            </div>
        );
    }

    function PlayerInput({ objValue, onNameChange, index, onListChange }) {
        const { label, num, type, player_value, faction_value } = objValue;
        const localUsernameWrongLength : boolean = (player_value.length < 3 || player_value.length > 20)
        return (
            <Box className="player-input-group" sx={{ paddingRight: 10 / 8 }}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl>
                        <Autocomplete
                            freeSolo={true}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={player_value !== "" && (userDuplicate || localUsernameWrongLength)}
                                    label="Select player"
                                    helperText={
                                        player_value == "" ? "Select a player" : 
                                            userDuplicate ? "You can not have the same name for both players" : 
                                                localUsernameWrongLength ? "Player name must be between 3 and 20 characters." : ""
                                    }
                                    onChange={(e) =>
                                        onNameChange(e.target.value, index)
                                    }
                                />
                            )}
                            key={index}
                            id={"player_" + num}
                            sx={{ width: 200 }}
                            options={usernames}
                            value={player_value || ""}
                            onChange={(_e, value) => onNameChange(value, index)}
                            disableClearable
                        />
                        <FormHelperText
                            id={"player" + player_value}
                        ></FormHelperText>
                    </FormControl>
                </Box>

                <Box sx={{ minWidth: 300 }}>
                    <FormControl fullWidth>
                        <Autocomplete
                            key={index}
                            id={label}
                            options={FACTIONS_ARRAY}
                            defaultValue={FACTIONS.SELECT_FACTION}
                            value={faction_value || FACTIONS.SELECT_FACTION}
                            renderInput={(params) => (
                                <TextField 
                                    {...params} 
                                    error={faction_value===FACTIONS.SELECT_FACTION} 
                                    helperText={(faction_value===FACTIONS.SELECT_FACTION || faction_value === "") ? "Please select a faction." : ""} 
                                    label="Faction" 
                                />
                            )}
                            onChange={(_e, value) => onListChange(value, index)}
                        />
                    </FormControl>
                </Box>
                {renderPoints(true, index)}
                {renderPoints(false, index)}
                <FormControl style={{ margin: "10px" }}>
                    <InputLabel htmlFor="totalPoints">Total points:</InputLabel>
                    <OutlinedInput
                        id="totalPoints"
                        disabled={true}
                        value={
                            formInputValues[index].p_points +
                            formInputValues[index].s_points
                        }
                    />
                </FormControl>
            </Box>
        );
    }

    if (!user) {
        return (
            <Typography sx={{paddingBottom:2, paddingTop:2}}>
                You need to be logged in to create a match
            </Typography>
        );
    }

    return (
        <div id="matchCreator">
            {renderSyncAlert(persistenceData)}
            <form>
                <Box sx={{ paddingTop: 10 / 8 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={dayjs(date)}
                            defaultValue={dayjs(date)}
                            onChange={handleDateChangeACB}
                            label="Match Date:"
                        />
                    </LocalizationProvider>
                </Box>

                <Box className="players">
                    {formInputValues.map((obj, index) =>
                        PlayerInput({
                            objValue: obj,
                            onNameChange: handleNameChangeACB,
                            index: index,
                            onListChange: handleListChangeACB,
                        })
                    )}
                </Box>

                <Box className="matchInfo">
                    <Box sx={{ minWidth: 120, maxWidth: 200, padding: 10 / 8 }}>
                        <FormControl fullWidth>
                            <InputLabel id="winners">Winners:</InputLabel>
                            <Select
                                value={winners}
                                label="Winners:"
                                onChange={onWinnerChangeACB}
                                onFocus={onWinnerFocusACB}
                                onBlur={(e) => onWinnerBlurACB(e)}
                            >
                                {formInputValues.map(
                                    ({ num, player_value }) => {
                                        return (
                                            <MenuItem
                                                key={num}
                                                value={player_value}
                                            >
                                                {player_value}
                                            </MenuItem>
                                        );
                                    }
                                )}
                            </Select>
                            <FormHelperText sx={{color: "#00000099"}}>{(winners==="") ? "Please select a winner." : ""}</FormHelperText>
                        </FormControl>
                    </Box>

                    <Box className="notes">
                        <FormControl>
                            <InputLabel id="notes">Match Notes:</InputLabel>
                            <OutlinedInput
                                sx={{width:1000, minHeight: 150}}
                                value={notes}
                                label="Match Notes"
                                type="text"
                                multiline
                                rows={4}
                                onChange={(e) => onNotesChangeACB(e)}
                            />
                        </FormControl>
                    </Box>
                </Box>
            </form>
            <Box sx={{paddingTop: 10}}>
                <ButtonGroup variant="contained">
                    <Tooltip
                        title={
                            !invalidInput ? "" : 
                                userDuplicate ? "Please choose unique players." : 
                                    playerNames.some((player) => player === "") ? "Please pick a player name." : 
                                        usernameWrongLength ? "Player names must be between 3 and 20 characters long." :
                                            playerFactions.some((faction) => faction === FACTIONS.SELECT_FACTION || faction === "") ? "Please choose player factions." :
                                                winners === "" ? "Please pick a winner." : ""
                            } 
                        placement="bottom"
                        >
                            <span>
                                <Button disabled={!connected || invalidInput} onClick={onClickCreateMatchACB}>
                                    {connected ? "Create Match" : "Not connected"}
                                </Button>
                            </span>
                    </Tooltip>
                    <Button onClick={onClickCancelACB}>Cancel</Button>
                </ButtonGroup>
            </Box>
        </div>
    );
}
