import { observer } from "mobx-react-lite";
import React from "react";
import { NavbarView } from "../views/navbarView.tsx";
import { LeaderBoardModel } from "../model/LeaderboardModel.ts";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, getUsername } from "../Firebase.ts";
import { reaction } from "mobx";

const Navbar = observer(({ model }: { model: LeaderBoardModel }) => {
    const provider = new GoogleAuthProvider();
    function handleHomeButtonClick() {
        location.hash = "";
    }

    reaction(
        () => model.usernameInput,
        () => model.checkUsername(model.usernameInput)
    );

    function handleUsernameChange(e) {
        if (!e.target.value) {
            return;
        }
        model.setUsernameInput(e.target.value);
    }

    function handleUsernameConfirm() {
        model.createUserName();
    }

    function handleCreateMatchButtonClick() {
        model.startMatchCreation();
        window.location.hash = "#/matchCreator";
    }

    async function handleLoginButtonClick() {
        await signInWithPopup(auth, provider).then((result) => {
            model.setUser(result.user);
            console.log("Logged in as: ", result.user.displayName);
            return true;
        });
    }

    function handleLogoutButtonClick() {
        signOut(auth);
    }

    return (
        <div>
            <NavbarView
                user={model.user}
                username={model.username}
                validUsername={model.isValidUserName}
                handleHomeButtonClick={handleHomeButtonClick}
                handleUsernameConfirm={handleUsernameConfirm}
                handleCreateMatchButtonClick={handleCreateMatchButtonClick}
                handleLoginButtonClick={handleLoginButtonClick}
                handleLogoutButtonClick={handleLogoutButtonClick}
                handleUsernameChange={handleUsernameChange}
            />
        </div>
    );
});

export { Navbar };
