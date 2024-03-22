import React from "react";
import { HomeScreen } from "./presenters/homePresenter.tsx";
import { MatchCreator } from "./presenters/matchCreatorPresenter.tsx";
import { Match } from "./presenters.matchPresenter.tsx";
import { createHashRouter, RouterProvider, RouteObject } from "react-router-dom";
import { LatestMatches } from "./presenters/latestMatchesPresenter.tsx";
import { observer } from "mobx-react-lite";
import { LeaderBoardModel } from "./model/LeaderboardModel.ts";

export const App = observer(({ model }: { model: LeaderBoardModel }) => {
    function makeMatchPaths(){
        let pathArray : RouteObject[] = [];
        for (const match in model.matches){
            pathArray.push(
                {
                    path: string.concat("/","")
                    element: <Match match={match},
                }
            )
        }
    }

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