import { User } from "firebase/auth";
import React from "react";

export function LoginView({ login, logout, user }: { login: () => void, logout: () => void, user: User | null }) {
    if (user) {
        return (
            <div id="loggedin-wrapper">
                <span>Signed in as {user.displayName}</span>
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