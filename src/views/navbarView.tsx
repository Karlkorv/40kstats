import React from "react"

export function NavbarView({model}) {
    function onHomeButtonClickACB(e){

    }

    function onCreateMatchButtonClick(e){

    }

    function onLoginButtonClick(e){

    }

    function onLogoutButtonClick(e){

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
                    Create Match
                </button>
            </div>
            <div className="login-button">
                <button disabled={model.user} onClick={(e) => onLoginButtonClick(e)}>
                    Login
                </button>
            </div>
            <div className="logout-button">
                <button disabled={!model.user} onClick={(e) => onLogoutButtonClick(e)}>

                </button>
            </div>
        </div>
    );
}