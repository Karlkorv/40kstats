import React from "react"
import { Match } from "../model/match.ts"

export function LastestMatchesView({ addDummyMatch, matches }: { addDummyMatch: () => void, matches: Match[] }) {

    function dummyMatchClickedACB() {
        addDummyMatch();
    }

    function matchRenderCB(match: Match) {
        return (
            <tr key={match.date.getTime()}>
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
            <div className="table-wrapper">
                <div className="table-scroll">
                    <table className="matches-table">
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
            </div>
        </div>
    )
}