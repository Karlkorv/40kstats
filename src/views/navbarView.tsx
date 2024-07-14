import React from "react";
import {
    Button,
    AppBar,
    Toolbar,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
    IconButton,
} from "@mui/material";
import { Help } from "@mui/icons-material/";
import { User } from "firebase/auth";

export function NavbarView({
    user,
    username,
    usernameInput,
    usernameExists,
    validUsername,
    handleHomeButtonClick,
    handleTournamentClick,
    handleCreateMatchButtonClick,
    handleUsernameConfirm,
    handleLoginButtonClick,
    handleLogoutButtonClick,
    handleUsernameChange,
    handleHelpButtonClick,
}: {
    user: User | null;
    username: string | null;
    usernameInput: string;
    usernameExists: boolean;
    validUsername: boolean;
    handleHomeButtonClick: () => void;
    handleTournamentClick: () => void;
    handleCreateMatchButtonClick: () => void;
    handleUsernameConfirm: () => void;
    handleLoginButtonClick: () => void;
    handleLogoutButtonClick: () => void;
    handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleHelpButtonClick: () => void;
}) {
    function onHomeButtonClickACB() {
        handleHomeButtonClick();
    }

    function onTournamentButtonClick() {
        handleTournamentClick();
    }

    function onCreateMatchButtonClick() {
        handleCreateMatchButtonClick();
    }

    function onLoginButtonClick() {
        handleLoginButtonClick();
    }

    function onLogoutButtonClick() {
        handleLogoutButtonClick();
    }

    function onConfirmClick() {
        handleUsernameConfirm();
    }

    function onHelpButtonClick() {
        handleHelpButtonClick();
    }

    function renderUsernameCreation() {
        if (username || !user) {
            return;
        }
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 10,
                    paddingRight: 10,
                    gap: "10px",
                }}
            >
                <FormControl>
                    <TextField
                        id="username-input"
                        size="small"
                        color="secondary"
                        onInput={handleUsernameChange}
                        label="Username"
                        variant="filled"
                    />
                    <FormHelperText style={{ color: "white" }}>
                        {usernameInput.length < 3 || usernameInput.length > 20
                            ? "Username must be between 3 and 20 characters long."
                            : usernameExists
                            ? "Username already exists"
                            : ""}
                    </FormHelperText>
                </FormControl>
                <Button
                    sx={{ marginTop: "-1px" }}
                    id="username-confirm-button"
                    onClick={onConfirmClick}
                    variant="contained"
                    size="small"
                    disabled={!validUsername}
                >
                    Confirm Username
                </Button>
            </div>
        );
    }

    return (
        <div className="navbar">
            <AppBar className="MuiAppBar" position="sticky">
                <Toolbar
                    className="MuiToolbar"
                    style={{ justifyContent: "space-between" }}
                >
                    <div
                        className="left-buttons"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            paddingRight: "10px",
                        }}
                    >
                        <div
                            id="titletext"
                            style={{
                                cursor: "pointer",
                                justifyContent: "inherit",
                                display: "flex",
                                alignItems: "inherit",
                            }}
                            onClick={onHomeButtonClickACB}
                        >
                            <img
                                src="/adeptus-mechanicus.svg"
                                alt="Website image"
                                style={{
                                    height: "50px",
                                    width: "50px",
                                    padding: "5px",
                                }}
                            />
                            <div style={{ margin: "2px" }}>
                                <Typography color={"lightgrey"} variant="h4">
                                    40kstats
                                </Typography>
                                <Typography
                                    color={"lightgrey"}
                                    variant="subtitle2"
                                >
                                    a 40k match tracker
                                </Typography>
                            </div>
                        </div>
                        <IconButton onClick={() => onHelpButtonClick()}>
                            <Help />
                        </IconButton>
                        <Button
                            variant="contained"
                            disabled={!user}
                            size="small"
                            onClick={() => onCreateMatchButtonClick()}
                        >
                            {(user && "Create Match") ||
                                (!user && "Sign in to create match")}
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => onTournamentButtonClick()}
                        >
                            Tournaments
                        </Button>

                        {renderUsernameCreation()}
                    </div>
                    {!user && (
                        <div className="login-button">
                            <Button
                                variant="contained"
                                onClick={() => onLoginButtonClick()}
                            >
                                Login
                            </Button>
                        </div>
                    )}
                    {user && (
                        <div
                            style={{ display: "flex" }}
                            className="logout-button"
                        >
                            <div>
                                <Typography
                                    variant="caption"
                                    style={{
                                        marginRight: "8px",
                                        marginTop: "2px",
                                        color: "lightgray",
                                        width: "70%",
                                        fontSize: "0.6rem",
                                    }}
                                >
                                    Logged in as{" "}
                                    {username ||
                                        user.displayName + " (No username)"}
                                </Typography>
                                <Button
                                    onClick={onLogoutButtonClick}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
