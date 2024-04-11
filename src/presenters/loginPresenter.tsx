import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { observer } from "mobx-react-lite";
import React from "react";
import { LeaderBoardModel } from "../model/LeaderboardModel";
import { LoginView } from "../views/loginView";

export const Login = observer(({ model }: { model: LeaderBoardModel }) => {
    const provider = new GoogleAuthProvider();

    function login() {
        signInWithPopup(model.authentication, provider).then((result) => {
            console.log("Logged in as: ", result.user.displayName);
        })
    }

    function logOut() {
        signOut(model.authentication).then(() => {
            console.log("Logged out");
        });
    }

    return (
        <LoginView login={login} logout={logOut} loggedIn={model.loggedIn} username={model.authentication.currentUser?.displayName} />
    )
})