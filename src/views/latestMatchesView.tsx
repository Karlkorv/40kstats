import React from "react"
import { Match } from "../model/match.ts"

export function LastestMatchesView({ addDummyMatch, matchClicked, matches, moreMatches }: { addDummyMatch: () => void, matchClicked: (match: Match) => void, matches: Match[], moreMatches: (amt?: number) => void }) {

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
            <tr key={match.matchID || match.date.getTime()} onClick={matchRowClickedACB}>
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
            <div id="table-wrapper">
                <div id="table-scroll">
                    <table>
                        <thead>
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
                <button onClick={moreMatchesACB}>More</button>
            </div>
        </div>
    )
}