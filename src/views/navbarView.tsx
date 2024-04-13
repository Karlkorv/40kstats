import React from "react"

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
            <div className="home-button">
                <button onClick={(e) => onHomeButtonClickACB(e)}>
                    Home
                </button>
            </div>
            <div className="create-match-button">
                <button disabled={!model.user} onClick={(e) => onCreateMatchButtonClick(e)}>
                    {model.user && "Create Match" || !model.user && "Sign in to create match"}
                </button>
            </div>
            {model.user && <div className="login-button">
                <button onClick={(e) => onLoginButtonClick(e)}>
                    Login
                </button>
            </div>}

            {!model.user && <div className="logout-button">
                <button onClick={(e) => onLogoutButtonClick(e)}>
                    Logout
                </button>
            </div>}
        </div>
    );
}