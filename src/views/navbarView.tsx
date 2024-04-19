import React from "react"
import { IconButton, Button, AppBar } from "@mui/material";
import { Home } from "@mui/icons-material";

export function NavbarView({model, handleHomeButtonClick, handleCreateMatchButtonClick, handleLoginButtonClick, handleLogoutButtonClick}) {
    function onHomeButtonClickACB(e){
        handleHomeButtonClick();
    }

    function onCreateMatchButtonClick(e){
        handleCreateMatchButtonClick();
    }

    function onLoginButtonClick(e){
        handleLoginButtonClick();
    }

    function onLogoutButtonClick(e){
        handleLogoutButtonClick();
    }

    return (
        <div className="navbar">
            <AppBar>
                <div className="home-button">
                    <IconButton onClick={(e) => onHomeButtonClickACB(e)}>
                        <Home/>
                    </IconButton>
                </div>
                <div className="create-match-button">
                    <Button variant="contained" disabled={!model.user} onClick={(e) => onCreateMatchButtonClick(e)}>
                        {model.user && "Create Match" || !model.user && "Sign in to create match"}
                    </Button>
                </div>
                {model.user && <div className="login-button">
                    <Button variant="contained" onClick={(e) => onLoginButtonClick(e)}>
                        Login
                    </Button>
                </div>}

                {!model.user && <div className="logout-button">
                    <Button variant="contained" onClick={(e) => onLogoutButtonClick(e)}>
                        Logout
                    </Button>
                </div>}
            </AppBar>
        </div>
    );
}