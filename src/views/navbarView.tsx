import React from "react";
import {
    IconButton,
    Button,
    AppBar,
    Toolbar,
    Typography,
    Input,
    TextField,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import { trace } from "mobx";

export function NavbarView({
    user,
    username,
    validUsername,
    handleHomeButtonClick,
    handleCreateMatchButtonClick,
    handleUsernameConfirm,
    handleLoginButtonClick,
    handleLogoutButtonClick,
    handleUsernameChange,
}) {
    function onHomeButtonClickACB() {
        handleHomeButtonClick();
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
        handleUsernameConfirm;
    }

    function renderUsernameCreation() {
        if (username || !user) {
            return;
        }
        return (
            <div>
                <TextField
                    size="small"
                    color="secondary"
                    onInput={handleUsernameChange}
                    error={validUsername}
                    label="Enter a unique username"
                    variant="filled"
                />
                <Button
                    id="username-confirm-button"
                    onClick={handleUsernameConfirm}
                    variant="contained"
                    size="small"
                >
                    {validUsername ? "Confirm username" : "Invalid username"}
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
                    <div className="left-buttons">
                        <div
                            id="titletext"
                            style={{ marginRight: "30px", cursor: "pointer" }}
                            onClick={onHomeButtonClickACB}
                        >
                            <Typography color={"black"} variant="h4">
                                40kstats
                            </Typography>
                            <Typography color={"lightgrey"} variant="subtitle2">
                                a 40k match tracker
                            </Typography>
                        </div>
                        <Button
                            variant="contained"
                            disabled={!user}
                            size="small"
                            style={{
                                height: "50%",
                                marginTop: "5%",
                            }}
                            onClick={() => onCreateMatchButtonClick()}
                        >
                            {(user && "Create Match") ||
                                (!user && "Sign in to create match")}
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
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
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
                                    onClick={handleLogoutButtonClick}
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
