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

    return (
        <div className="navbar">
            <AppBar className="MuiAppBar" position="sticky">
                <Toolbar
                    className="MuiToolbar"
                    style={{ justifyContent: "space-between" }}
                >
                    <div className="left-buttons">
                        <IconButton onClick={() => onHomeButtonClickACB()}>
                            <Home />
                        </IconButton>
                        <Button
                            variant="contained"
                            disabled={!user}
                            onClick={() => onCreateMatchButtonClick()}
                        >
                            {(user && "Create Match") ||
                                (!user && "Sign in to create match")}
                        </Button>
                        <TextField
                            color="primary"
                            onChange={handleUsernameChange}
                            error={validUsername}
                            label="Enter a unique username"
                        />
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
                            <Button>Enter a username</Button>
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
