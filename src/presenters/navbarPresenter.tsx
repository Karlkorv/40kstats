import {observer} from "mobx-react-lite"
import React from "react"
import {NavbarView} from "../views/navbarView.tsx"
import { LeaderBoardModel } from "../model/LeaderboardModel.ts"

const Navbar = observer(({model} : {model: LeaderBoardModel}) => {
        return (
            <div>
                <NavbarView model={model}>

                </NavbarView>
            </div>
        )
})
export {Navbar}