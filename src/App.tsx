import React from "react";
import { HomeScreen } from "./presenters/homePresenter.tsx";
import { MatchCreator } from "./presenters/matchCreatorPresenter.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { LatestMatches } from "./presenters/latestMatchesPresenter.tsx";
import { observer } from "mobx-react-lite";
import { LeaderBoardModel } from "./model/LeaderboardModel.ts";
import "./style.css"

export const App = observer(({ model }: { model: LeaderBoardModel }) => {
    function makeRouter(model: LeaderBoardModel) {
        return createHashRouter([
            {
                path: "/",
                element: <HomeScreen model={model}></HomeScreen>,
            },
            {
                path: "/matchCreator",
                element: <MatchCreator model={model}></MatchCreator>,
            }
        ])
    }

    return (
        <div>
            <RouterProvider router={makeRouter(model)} />
            <LatestMatches model={model} />
        </div>
    )
})