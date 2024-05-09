import { Match } from "../model/match.ts";
import { FACTIONS, FACTIONS_ARRAY } from "../model/factions.ts";
import {
    Autocomplete,
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

export function MatchCreatorView({
    formInputValues,
    winners,
    notes,
    date,
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
        console.log("changing winner to " + e.target.value);
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
                    <Button
                        className="points-button"
                        size="small"
                        variant="outlined"
                        onClick={() =>
                            handlePointsButtonClick(-1, index, isPrimary)
                        }
                    >
                        -1
                    </Button>
                    <OutlinedInput
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
                </div>
            </FormControl>
        );
    }

    function PlayerInput({ objValue, onNameChange, index, onListChange }) {
        const { label, num, type, player_value, faction_value } = objValue;
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
                {renderPoints(true, index)}
                {renderPoints(false, index)}
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
                <Button onClick={onClickCreateMatchACB}>Create match</Button>
                <Button onClick={onClickCancelACB}>Cancel</Button>
            </ButtonGroup>
        </div>
    );
}
