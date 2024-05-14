import React from "react";
import { Match } from "../model/match.ts";
import { Box, Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

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
      <Typography fontSize={50}>Winner: {match.winners[0]}</Typography>
      <Box className="table-class">
        <Table style={{margin:"auto", justifyContent:"center", alignItems:"center"}}>
          {renderWinnerRow(match)}
          <TableBody>
            <TableRow id="faction-row">
              <TableCell style={{ borderBottom: "none", borderRight:"1px solid rgba(224, 224, 224, 1)", fontWeight:"bold"}}>Faction</TableCell>
              <TableCell style={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{match.factions[0]}</TableCell>
              <TableCell>{match.factions[1]}</TableCell>
            </TableRow>
            <TableRow id="p-points-row">
              <TableCell style={{borderBottom: "none", borderTop:"none", borderRight:"1px solid rgba(224, 224, 224, 1)", fontWeight:"bold"}}>Primary Points</TableCell>
              <TableCell style={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{match.points_primary[0]}</TableCell>
              <TableCell>{match.points_primary[1]}</TableCell>
            </TableRow>
            <TableRow id="s-points-row">
              <TableCell style={{borderRight:"1px solid rgba(224, 224, 224, 1)", fontWeight:"bold"}}>Secondary Points</TableCell>
              <TableCell style={{borderRight: "1px solid rgba(224, 224, 224, 1)"}}>{match.points_secondary[0]}</TableCell>
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
      </Box>
      <ButtonGroup variant="contained" id="match-buttons">
        <Button onClick={() => { editMatchACB() }}>Edit</Button>
        <Button onClick={() => { window.location.hash = "#/"; }}>Back</Button>
        <Button onClick={() => { deleteMatchACB(), new Audio("/audio/dino-noise.m4a").play() }}>Delete match</Button>
        <Button>Share match</Button>
      </ButtonGroup>
    </div>
  );
}