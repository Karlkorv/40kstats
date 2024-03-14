import React from "react";
import { HomeScreen } from "./presenters/homePresenter.tsx";
import { MatchCreator } from "./presenters/matchCreatorPresenter.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";

export function App({model : LeaderboardModel}) {
    function makeRouter(LeaderboardModel){
        return createHashRouter([
            {
                path: "/",
                element: <HomeScreen model={LeaderboardModel}></HomeScreen>,
            },
            {
                path: "/matchCreator",
                element: <MatchCreator model={LeaderboardModel}></MatchCreator>,
            }
        ])
    }

    return (
        <div>
            <RouterProvider router={makeRouter(LeaderboardModel)}/>
        </div>
    )
}