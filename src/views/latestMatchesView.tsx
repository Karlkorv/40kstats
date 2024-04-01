import React from "react"
import { Match } from "../model/match.ts"

export function LastestMatchesView({ addDummyMatch, matchClicked, matches }: { addDummyMatch: () => void, matchClicked: (match: Match) => void, matches: Match[] }) {

    function dummyMatchClickedACB() {
        addDummyMatch();
    }

    function matchRenderCB(match: Match) {
        function matchRowClickedACB() {
            matchClicked(match);
        }
        return (
            <tr key={match.date.getTime()} onClick={matchRowClickedACB}>
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
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Player 1</th>
                        <th>Faction 1</th>
                        <th>Player 2</th>
                        <th>Faction 2</th>
                        <th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(matchRenderCB)}
                </tbody>
            </table>
        </div>
    )
}