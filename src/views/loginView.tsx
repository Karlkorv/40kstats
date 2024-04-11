import React from "react";

export function LoginView({ login, logout, loggedIn, username }) {
    if (loggedIn) {
        return (
            <div id="loggedin-wrapper">
                <span>Signed in as {username}</span>
                <button onClick={logout}>Sign out</button>
            </div>
        )
    }

    return (
        <div id="login-wrapper">
            <button onClick={login}>Sign in with Google</button>
        </div>
    )
}