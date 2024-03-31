import React from "react"
import { Match } from "../model/match.ts"

export function LastestMatchesView({ syncClicked, matches }: { syncClicked: () => void, matches: Match[] }) {
    function onSyncClickACB() {
        console.log("Sync clicked")
        syncClicked();
    }

    function matchRenderCB(match: Match) {
        return (
            <tr key={match.date.getTime()}>
                <td>{match.date.toISOString()}</td>
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
            <button onClick={onSyncClickACB}>Sync</button>
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