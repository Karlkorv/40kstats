import {observer} from "mobx-react-lite"
import React from "react"
import { NavbarView } from "../views/navbarView.tsx"
import { LeaderBoardModel } from "../model/LeaderboardModel.ts"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../Firebase.ts"

const Navbar = observer(({model} : {model: LeaderBoardModel}) => {
    const provider = new GoogleAuthProvider();
    function handleHomeButtonClick(){

    }

    function handleCreateMatchButtonClick(){
        model.startMatchCreation();
		window.location.hash = "#/matchCreator";
    }

    async function handleLoginButtonClick(){
        await signInWithPopup(auth, provider).then((result) => {
            model.setUser(result.user);
            console.log("Logged in as: ", result.user.displayName);
            return true;
        });
    }

    function handleLogoutButtonClick(){
        signOut(auth);
    }
    
        return (
            <div>
                {NavbarView({
                    model: model,
                    handleHomeButtonClick: handleHomeButtonClick,
                    handleCreateMatchButtonClick: handleCreateMatchButtonClick,
                    handleLoginButtonClick: handleLoginButtonClick,
                    handleLogoutButtonClick: handleLogoutButtonClick
                })}
                {/* <NavbarView 
                    model={model} 
                    handleHomeButtonClick={handleHomeButtonClick} 
                    handleCreateMatchButtonClick={handleCreateMatchButtonClick} 
                    handleLoginButtonClick={handleLoginButtonClick} 
                    handleLogoutButtonClick={handleLogoutButtonClick}>
                </NavbarView> */}
            </div>
        )
});

export {Navbar}