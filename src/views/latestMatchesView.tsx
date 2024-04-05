import React from "react"
import { Match } from "../model/match.ts"

export function LastestMatchesView({
    addDummyMatch,
    matchClicked,
    matches,
    moreMatches,
    totalMatches
}:
    {
        addDummyMatch: () => void,
        matchClicked: (match: Match) => void,
        matches: Match[],
        moreMatches: (amt?: number) => void,
        totalMatches: number
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
                <td>{match.winners[0]}</td>
            </tr>
        )
    }

    return (
        <div>
            <h1>Latest Matches</h1>
            <button onClick={dummyMatchClickedACB}>Add dummy match</button>
            <p>Showing {matches.length} / {totalMatches} Matches</p>
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
                <button id="button-more-matches" onClick={moreMatchesACB}>More</button>
            </div>
        </div>
    )
}