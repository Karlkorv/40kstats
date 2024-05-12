import React from "react";
import { Match } from "../model/match.ts";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export function MatchView({ match, deleteMatch, editMatch }: { match: Match, deleteMatch: any, editMatch: any }) {
  function deleteMatchACB() {
    console.log("Deleting match with ID: " + match.matchID)
    deleteMatch(match.matchID);
  }

  function editMatchACB() {
    editMatch(match);
  }

  function renderWinnerRow(match: Match) {
    if (match.winners[0] === match.players[0]) {
      return (
        <TableHead id="player-row">
          <TableRow>
            <TableCell></TableCell>
            <TableCell id="winner-cell">{match.players[0]}</TableCell>
            <TableCell>{match.players[1]}</TableCell>
          </TableRow>
        </TableHead>
      )
    } else {
      return (
        <TableHead id="player-row">
          <TableRow>
            <TableCell></TableCell>
            <TableCell>{match.players[0]}</TableCell>
            <TableCell id="winner-cell">{match.players[1]}</TableCell>
          </TableRow>
        </TableHead>
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
      <Table>
        {renderWinnerRow(match)}
        <TableBody>
          <TableRow id="faction-row">
            <TableCell style={{ borderBottom: "none", borderRight:"1px solid rgba(224, 224, 224, 1)"}}>Faction</TableCell>
            <TableCell>{match.factions[0]}</TableCell>
            <TableCell>{match.factions[1]}</TableCell>
          </TableRow>
          <TableRow id="p-points-row">
            <TableCell style={{borderBottom: "none", borderTop:"none", borderRight:"1px solid rgba(224, 224, 224, 1)"}}>Primary Points</TableCell>
            <TableCell>{match.points_primary[0]}</TableCell>
            <TableCell>{match.points_primary[1]}</TableCell>
          </TableRow>
          <TableRow id="s-points-row">
            <TableCell style={{borderRight:"1px solid rgba(224, 224, 224, 1)"}}>Secondary Points</TableCell>
            <TableCell>{match.points_secondary[0]}</TableCell>
            <TableCell>{match.points_secondary[1]}</TableCell>
          </TableRow>
          {match.notes && match.notes.length > 0 &&
            <tr id="notes-row">
              <th>Notes:</th>
              <td colSpan={2}>{match.notes}</td>
            </tr>
          }
        </TableBody>
      </Table>
      <div id="match-buttons">
        <button onClick={() => { editMatchACB() }}>Edit</button>
        <button onClick={() => { window.location.hash = "#/"; }}>Back</button>
        <button onClick={() => { deleteMatchACB(), new Audio("/audio/dino-noise.m4a").play() }}>Delete match</button>
        <button>Share match</button>
      </div>
    </div>
  );
}