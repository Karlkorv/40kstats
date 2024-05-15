import React from "react";
import {
    Button,
    AppBar,
    Toolbar,
    Typography,
    TextField,
    Box,
    IconButton,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { HelpButtonDialog } from "../presenters/helpButtonDialogPresenter";

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
    handleHelpButtonClick,
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
                    onClick={onConfirmClick}
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
                    <div
                        className="left-buttons"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
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
                            <HelpIcon />
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
