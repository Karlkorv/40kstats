import React from "react";
import { HomeScreen } from "./presenters/homePresenter.tsx";
import { MatchCreator } from "./presenters/matchCreatorPresenter.tsx";
import { MatchPres } from "./presenters/matchPresenter.tsx";
import { createHashRouter, RouterProvider, RouteObject } from "react-router-dom";
import { LatestMatches } from "./presenters/latestMatchesPresenter.tsx";
import { observer } from "mobx-react-lite";
import { LeaderBoardModel } from "./model/LeaderboardModel.ts";

export const App = observer(({ model } : { model : LeaderBoardModel} ) => {
    // function makeMatchPaths(){
    //     let pathArray : RouteObject[] = [];
    //     for (var match of model.matches){
    //         pathArray.push(
    //             {
    //                 path: `/match/${match.matchID.toString(10)}`,
    //                 element: 
    //                 <MatchPres 
    //                     {...model} 
    //                     addMatchFromFirestore={model.addMatchFromFirestore} 
    //                     addMatch={model.addMatch} 
    //                     getMatches={model.getMatches}>
    //                 </MatchPres>,
    //             },
    //         );
    //     }
    //     return pathArray;
    // }

    function makeRouter(model: LeaderBoardModel) {
        let routes : RouteObject[] = [
            {
                path: "/",
                element: <HomeScreen model={model}></HomeScreen>,
            },
            {
                path: "/matchCreator",
                element: <MatchCreator model={model}></MatchCreator>,
            },
        ]
        return createHashRouter(routes);
    }

    return (
        <div>
            <RouterProvider router={makeRouter(model)} />
            <LatestMatches model={model} />
        </div>
    )
})