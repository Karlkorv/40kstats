import { observer } from "mobx-react-lite";
import React from "react";
import { NavbarView } from "../views/navbarView.tsx";
import { LeaderBoardModel } from "../model/LeaderboardModel.ts";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase.ts";
import { reaction } from "mobx";
import { HelpButtonDialog } from "./helpButtonDialogPresenter.tsx";

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
        if (!(e.target.value === "") && !e.target.value) {
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

    function handleHelpButtonClick() {
        model.handleDialogClick();
        return <HelpButtonDialog model={model}></HelpButtonDialog>;
    }

    return (
        <div>
            <NavbarView
                user={model.user}
                username={model.username}
                usernameInput={model.usernameInput}
                usernameExists={model.usernameExists}
                validUsername={model.isValidUserName}
                handleHomeButtonClick={handleHomeButtonClick}
                handleUsernameConfirm={handleUsernameConfirm}
                handleCreateMatchButtonClick={handleCreateMatchButtonClick}
                handleLoginButtonClick={handleLoginButtonClick}
                handleLogoutButtonClick={handleLogoutButtonClick}
                handleUsernameChange={handleUsernameChange}
                handleHelpButtonClick={handleHelpButtonClick}
            />
        </div>
    );
});

export { Navbar };
