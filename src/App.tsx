import React from "react";
import { HomeScreen } from "./presenters/homePresenter.tsx";
import { MatchCreator } from "./presenters/matchCreatorPresenter.tsx";
import { MatchPresenter } from "./presenters/matchPresenter.tsx";
import { createHashRouter, RouterProvider, RouteObject } from "react-router-dom";
import { LatestMatches } from "./presenters/latestMatchesPresenter.tsx";
import { observer } from "mobx-react-lite";
import { LeaderBoardModel } from "./model/LeaderboardModel.ts";
import "./style.css"
import { Login } from "./presenters/loginPresenter.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorView from "./views/errorView.tsx";

export const App = observer(({ model }: { model: LeaderBoardModel }) => {
    function makeRouter(model: LeaderBoardModel) {
        const routes: RouteObject[] = [
            {
                path: "/",
                element: <HomeScreen model={model}></HomeScreen>,
            },
            {
                path: "/matchCreator",
                element: <MatchCreator model={model}></MatchCreator>,
            },
            // Add route for individual matches
            {
                path: "/match/:matchId", // Dynamic route parameter for match ID
                element: <MatchPresenter model={model}></MatchPresenter>,
            },
        ]
        return createHashRouter(routes);
    }
    return (
        <div>
            <ErrorBoundary fallback={ErrorView()}>
                <Login model={model} />
                <RouterProvider router={makeRouter(model)} />
                <LatestMatches model={model} />
            </ErrorBoundary>
        </div>
    )
})