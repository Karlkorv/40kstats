import React from "react";
import { Match } from "../model/match.ts";

export function MatchView({ match, deleteMatch, editMatch }: { match: Match, deleteMatch: any, editMatch: any }) {
  function deleteMatchACB(){
    console.log("Deleting match with ID: " + match.matchID)
    deleteMatch(match.matchID);
  }
  
  function editMatchACB(){
    editMatch(match);
  }

  function renderWinnerRow(match: Match) {
    if (match.winners[0] === match.players[0]) {
      return (
        <thead id="player-row">
          <tr>
            <th></th>
            <th id="winner-cell">{match.players[0]}</th>
            <th>{match.players[1]}</th>
          </tr>
        </thead>
      )
    } else {
      return (
        <thead id="player-row">
          <tr>
            <th></th>
            <th>{match.players[0]}</th>
            <th id="winner-cell">{match.players[1]}</th>
          </tr>
        </thead>
      )
    }
  }

  if (match.players.length > 2) {
    return (
      <div id="more-player-matches">
        3 or more player matches coming soon<sup>TM</sup>
      </div>
    )
  }
  return (
    <div id="match-wrapper">
      <h1>Winner: {match.winners[0]}</h1>
      <table>
        {renderWinnerRow(match)}
        <tbody>
          <tr id="faction-row">
            <th>Faction</th>
            <td>{match.factions[0]}</td>
            <td>{match.factions[1]}</td>
          </tr>
          <tr id="p-points-row">
            <th>Primary Points</th>
            <td>{match.points_primary[0]}</td>
            <td>{match.points_primary[1]}</td>
          </tr>
          <tr id="s-points-row">
            <th>Secondary Points</th>
            <td>{match.points_secondary[0]}</td>
            <td>{match.points_secondary[1]}</td>
          </tr>
        </tbody>
      </table>
      <div id="match-buttons">
        <button onClick={() => { editMatchACB() }}>Edit</button>
        <button onClick={() => { window.location.hash = "#/"; }}>Back</button>
        <button onClick={() => { deleteMatchACB(), new Audio("/audio/dino-noise.m4a").play() }}>Delete match</button>
        <button>Share match</button>
      </div>
    </div>
  );
}