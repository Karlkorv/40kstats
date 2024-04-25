import React from "react"
import { IconButton, Button, AppBar, Toolbar } from "@mui/material";
import { Home } from "@mui/icons-material";
import { trace } from "mobx";

export function NavbarView({ user, handleHomeButtonClick, handleCreateMatchButtonClick, handleLoginButtonClick, handleLogoutButtonClick }) {
    function onHomeButtonClickACB(e) {
        handleHomeButtonClick();
    }

    function onCreateMatchButtonClick(e) {
        handleCreateMatchButtonClick();
    }

    function onLoginButtonClick(e) {
        handleLoginButtonClick();
    }

    function onLogoutButtonClick(e) {
        handleLogoutButtonClick();
    }

    return (
        <div className="navbar">
            <AppBar className="MuiAppBar" position="sticky">
                <Toolbar className="MuiToolbar">
                    <div className="home-button">
                        <IconButton onClick={(e) => onHomeButtonClickACB(e)}>
                            <Home />
                        </IconButton>
                    </div>
                    <div className="create-match-button">
                        <Button variant="contained" disabled={!user} onClick={(e) => onCreateMatchButtonClick(e)}>
                            {user && "Create Match" || !user && "Sign in to create match"}
                        </Button>
                    </div>
                    {!user && <div className="login-button">
                        <Button variant="contained" onClick={(e) => onLoginButtonClick(e)}>
                            Login
                        </Button>
                    </div>}

                    {user && <div className="logout-button">
                        <Button variant="contained" onClick={(e) => onLogoutButtonClick(e)}>
                            Logout
                        </Button>
                    </div>}
                </Toolbar>
            </AppBar>
        </div>
    );
}