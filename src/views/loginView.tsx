import { User } from "firebase/auth";
import React from "react";

export function LoginView({ login, logout, user, username, createUserName, checkUserName, validUsername }): React.JSX.Element {
    function usernameForm() {
        return (
            <form onSubmit={createUserName}>
                <input onChange={checkUserName} type="text" id="username" name="username" placeholder="Enter username" required />
                <button disabled={validUsername} type="submit"> Submit</button>
            </form>
        )
    }

    if (user) {
        return (
            <div id="loggedin-wrapper">
                <span>Signed in as {username || user.displayName}</span>
                <button onClick={logout}>Sign out</button>
                {username ? null : usernameForm()}
            </div>
        )
    }

    return (
        <div id="login-wrapper">
            {/* <button onClick={login}>Sign in with Google</button> */}
        </div>
    )
}