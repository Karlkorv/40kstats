import React from "react";
import { HomeScreen } from "./presenters/homePresenter.tsx"

export function App({model : LeaderboardModel}) {
    return (
        <div>
            <HomeScreen model={LeaderboardModel}></HomeScreen>
        </div>
    )
}