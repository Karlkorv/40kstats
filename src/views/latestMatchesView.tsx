import React from "react"
import { Match } from "../model/match.ts"
import { toJS } from "mobx"
import { User } from "firebase/auth";

export function LastestMatchesView({
    addDummyMatch,
    matchClicked,
    matches,
    moreMatches,
    totalMatches,
    user
}:
    {
        addDummyMatch: () => void,
        matchClicked: (match: Match) => void,
        matches: Match[],
        moreMatches: (amt?: number) => void,
        totalMatches: number,
        user: User | null
    }) {

    function dummyMatchClickedACB() {
        addDummyMatch();
    }

    function moreMatchesACB() {
        moreMatches(10)
    }

    function matchRenderCB(match: Match) {
        function matchRowClickedACB(e) {
            e.preventDefault();
            matchClicked(match);
        }
        return (
            <tr className="matchRow" key={match.matchID || match.date.getTime()} onClick={matchRowClickedACB}>
                <td>{match.getDateString()}</td>
                <td>{match.players[0]}</td>
                <td>{match.factions[0]}</td>
                <td>{match.players[1]}</td>
                <td>{match.factions[1]}</td>
                <td>{match.winners}</td>
            </tr>
        )
    }
    console.log(toJS(matches));
    //console.log(typeof(toJS(matches)));
    console.log("'matches':", matches);
    console.log("Type of 'matches':", typeof (matches));
    return (
        <div>
            <button disabled={!user} onClick={dummyMatchClickedACB}>Add dummy match</button>
            <div id="table-wrapper">
                <div id="table-scroll">
                    <table>
                        <thead id="table-header">
                            <tr>
                                <th><span>
                                    Date
                                </span></th>
                                <th><span>
                                    Player 1
                                </span></th>
                                <th><span>
                                    Faction 1
                                </span></th>
                                <th><span>
                                    Player 2
                                </span></th>
                                <th><span>
                                    Faction 2
                                </span></th>
                                <th><span>
                                    Winner
                                </span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map(matchRenderCB)}
                        </tbody>
                    </table>
                </div>
                <div id="matches-more">
                    <p>Showing {matches.length} / {totalMatches} Matches</p>
                    <button onClick={moreMatchesACB}>More</button>
                </div>
            </div>
        </div >
    )
}