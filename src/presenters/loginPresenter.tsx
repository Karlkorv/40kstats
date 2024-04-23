import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { observer } from "mobx-react-lite";
import React from "react";
import { LeaderBoardModel } from "../model/LeaderboardModel";
import { LoginView } from "../views/loginView";
import { auth } from "../Firebase";

export const Login = observer(({ model }: { model: LeaderBoardModel }) => {
    const provider = new GoogleAuthProvider();

    function login() {
        signInWithPopup(auth, provider).then((result) => {
            console.log("Logged in as: ", result.user.displayName);
        })
    }

    function logOut() {
        signOut(auth);
    }

    function createUserName(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        model.createUserName(target.username.value);
    }

    function checkUserName(event: React.ChangeEvent<HTMLInputElement>) {
        model.checkUsername(event.target.value)
    }


    return (
        <LoginView login={login} logout={logOut} user={model.user} username={model.username} createUserName={createUserName} checkUserName={checkUserName} validUsername={model.isValidUserName} />
    )
})