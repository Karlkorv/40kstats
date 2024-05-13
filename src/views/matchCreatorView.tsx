import { Match } from "../model/match.ts";
import { FACTIONS, FACTIONS_ARRAY } from "../model/factions.ts";
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
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

    function PlayerInput({
        objValue,
        onNameChange,
        index,
        onListChange,
        onPrimaryPointsChange,
        onSecondaryPointsChange,
    }) {
        const {
            label,
            num,
            type,
            player_value,
            faction_value,
            p_points,
            s_points,
        } = objValue;
        return (
            <Box className="player-input-group" sx={{ paddingRight: 10 / 8 }}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl>
                        <Autocomplete
                            freeSolo={true}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select user"
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

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <Autocomplete
                            key={index}
                            id={label}
                            options={FACTIONS_ARRAY}
                            defaultValue={FACTIONS.ADEPTUS_MECHANICUS}
                            value={faction_value || FACTIONS.ADEPTUS_MECHANICUS}
                            renderInput={(params) => (
                                <TextField {...params} label="Faction" />
                            )}
                            onChange={(_e, value) => onListChange(value, index)}
                        />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <InputLabel id={"player_" + index + "_primary_points"}>
                            Primary Points
                        </InputLabel>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                handlePointsButtonClick(-1, index, true)
                            }
                        >
                            -1
                        </Button>
                        <OutlinedInput
                            key={index}
                            type="text"
                            id={"player_" + index + "_primary_points"}
                            label="Primary Points"
                            value={p_points}
                            onChange={(e) => onPrimaryPointsChange(e, index)}
                        />
                        <Button
                            onClick={() =>
                                handlePointsButtonClick(1, index, true)
                            }
                        >
                            +1
                        </Button>
                        <Button
                            onClick={() =>
                                handlePointsButtonClick(3, index, true)
                            }
                        >
                            +3
                        </Button>
                        <Button
                            onClick={() =>
                                handlePointsButtonClick(5, index, true)
                            }
                        >
                            +5
                        </Button>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <InputLabel
                            id={"player_" + index + "_secondary_points"}
                        >
                            Secondary Points
                        </InputLabel>
                        <button
                            onClick={() =>
                                handlePointsButtonClick(-1, index, false)
                            }
                        >
                            -1
                        </button>
                        <OutlinedInput
                            key={index}
                            type="text"
                            id={"player_" + index + "_secondary_points"}
                            label="Secondary Points"
                            value={s_points}
                            onChange={(e) => onSecondaryPointsChange(e, index)}
                        />
                        <Button
                            onClick={() =>
                                handlePointsButtonClick(1, index, false)
                            }
                        >
                            +1
                        </Button>
                        <Button
                            onClick={() =>
                                handlePointsButtonClick(3, index, false)
                            }
                        >
                            +3
                        </Button>
                        <Button
                            onClick={() =>
                                handlePointsButtonClick(5, index, false)
                            }
                        >
                            +5
                        </Button>
                    </FormControl>
                </Box>
            </Box>
        );
    }

    if (!user) {
        return (
            <div>
                <span>You need to be logged in to create a match</span>
            </div>
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

                <Box className="players" sx={{ display: "inline-flex" }}>
                    {formInputValues.map((obj, index) =>
                        PlayerInput({
                            objValue: obj,
                            onNameChange: handleNameChangeACB,
                            index: index,
                            onListChange: handleListChangeACB,
                            onPrimaryPointsChange: onPrimaryPointsChangeACB,
                            onSecondaryPointsChange: onSecondaryPointsChangeACB,
                        })
                    )}
                </Box>

                <Box className="matchInfo">
                    <Box sx={{ minWidth: 120, maxWidth: 200 }}>
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
                        </FormControl>
                    </Box>

                    <Box className="notes">
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
                </Box>
            </form>
            <ButtonGroup variant="contained">
                <Button disabled={!connected} onClick={onClickCreateMatchACB}>
                    {connected ? "Create Match" : "Not connected"}
                </Button>
                <Button onClick={onClickCancelACB}>Cancel</Button>
            </ButtonGroup>
        </div>
    );
}
