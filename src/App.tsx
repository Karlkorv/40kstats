import React from "react";
import { HomeScreen } from "./presenters/homePresenter.tsx";
import { MatchCreator } from "./presenters/matchCreatorPresenter.tsx";
import { MatchPresenter } from "./presenters/matchPresenter.tsx";
import {
    createHashRouter,
    RouterProvider,
    RouteObject,
} from "react-router-dom";
import { LatestMatches } from "./presenters/latestMatchesPresenter.tsx";
import { observer } from "mobx-react-lite";
import { LeaderBoardModel } from "./model/LeaderboardModel.ts";
import "./style.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorView from "./views/errorView.tsx";
import { Navbar } from "./presenters/navbarPresenter.tsx";
import { Alert, CircularProgress, Slide } from "@mui/material";
import { Check } from "@mui/icons-material";

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
        ];
        return createHashRouter(routes);
    }

    if (model.gettingMatches || model.gettingUser || model.gettingUsername) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <ErrorBoundary fallback={<ErrorView />}>
                <div>
                    <Navbar model={model} />
                </div>
                <RouterProvider router={makeRouter(model)} />
                <Slide
                    direction="up"
                    in={!model.connected}
                    mountOnEnter
                    unmountOnExit
                    timeout={{ exit: 1500 }}
                >
                    <Alert
                        id="connectionAlert"
                        severity={model.connected ? "success" : "error"}
                        icon={
                            model.connected ? <Check /> : <CircularProgress />
                        }
                    >
                        {!model.connected
                            ? "Connection lost, Reconnecting"
                            : "Reconnected"}
                    </Alert>
                </Slide>
                <LatestMatches model={model} />
            </ErrorBoundary>
        </div>
    );
});
