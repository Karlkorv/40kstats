import {observer} from "mobx-react-lite"
import React from "react"
import {NavbarView} from "../views/navbarView.tsx"
import { LeaderBoardModel } from "../model/LeaderboardModel.ts"

const Navbar = observer(({model} : {model: LeaderBoardModel}) => {
    function handleHomeButtonClick(){

    }

    function handleCreateMatchButtonClick(){

    }

    function handleLoginButtonClick(){

    }

    function handleLogoutButtonClick(){

    }
    
        return (
            <div>
                <NavbarView model={model} handleHomeButtonClick={handleHomeButtonClick} handleCreateMatchButtonClick={handleCreateMatchButtonClick} handleLoginButtonClick={handleLoginButtonClick} handleLogoutButtonClick={handleLogoutButtonClick}>

                </NavbarView>
            </div>
        )
})
export {Navbar}