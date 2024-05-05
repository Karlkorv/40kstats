import React from "react";
import { Match } from "../model/match.ts";
import { FACTIONS } from "../model/factions.ts";
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

export function MatchCreatorView({
    formInputValues,
    winners,
    notes,
    date,
    createNewMatch,
    handleCancelClick,
    handlePlayerNameChange,
    handleFactionChange,
    handleFocus,
    handleBlur,
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

    const handleNameChangeACB = (e, index) => {
        handlePlayerNameChange(e, index);
    };

    const handleListChangeACB = (e, index) => {
        handleFactionChange(e, index);
    };

    const handleFocusACB = (e) => {
        handleFocus(e);
    };

    const handleBlurACB = (e, index) => {
        handleBlur(e, index);
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

    function PlayerInput({
        objValue,
        onNameChange,
        index,
        onListChange,
        onFocus,
        onBlur,
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
                            renderInput={(params) => (
                                <TextField {...params} label="Select user" />
                            )}
                            key={index}
                            id={"player_" + num}
                            options={usernames}
                            value={player_value || ""}
                            onChange={(e) => onNameChange(e, index)}
                            disableClearable
                        />
                        <FormHelperText
                            id={"player" + player_value}
                        ></FormHelperText>
                    </FormControl>
                </Box>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id={"faction_" + num}>
                            Faction {num}:
                        </InputLabel>
                        <Select
                            key={index}
                            id={label}
                            labelId={"faction_" + num}
                            label={"Faction" + num}
                            value={faction_value}
                            autoComplete="off"
                            onChange={(e) => onListChange(e, index)}
                            onFocus={onFocus}
                            onBlur={(e) => onBlur(e, index)}
                        >
                            <MenuItem key={0} value="">
                                None
                            </MenuItem>
                            {/* TODO
                                See if there is any way to not have to create a new list 
                                for every Player Input, so that they can share the same <datalist>
                            */}
                            {Object.values(FACTIONS).map((faction, index) => (
                                <MenuItem key={index} value={faction}>
                                    {faction}
                                </MenuItem>
                            ))}
                        </Select>
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
            <form>
                <Box sx={{ paddingTop: 10 / 8 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={dayjs(date)}
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
                            onFocus: handleFocusACB,
                            onBlur: handleBlurACB,
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
                <Button onClick={onClickCreateMatchACB}>Create match</Button>
                <Button onClick={onClickCancelACB}>Cancel</Button>
            </ButtonGroup>
        </div>
    );
}
