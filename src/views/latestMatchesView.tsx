import React from "react"
import { Match } from "../model/match.ts"
import { toJS } from "mobx"
import { User } from "firebase/auth";
import { styled, Table, TableCell, TableHead, TableRow } from "@mui/material"

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
}))

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
            <StyledTableRow className="matchRow" key={match.matchID || match.date.getTime()} onClick={matchRowClickedACB}>
                <TableCell>{match.getDateString()}</TableCell>
                <TableCell>{match.players[0]}</TableCell>
                <TableCell>{match.factions[0]}</TableCell>
                <TableCell>{match.players[1]}</TableCell>
                <TableCell>{match.factions[1]}</TableCell>
                <TableCell>{match.winners}</TableCell>
            </StyledTableRow>
        )
    }
    console.log(toJS(matches));
    //console.log(typeof(toJS(matches)));
    console.log("'matches':", matches);
    console.log("Type of 'matches':", typeof (matches));
    return (
        <div>
            <button disabled={!user} onClick={dummyMatchClickedACB}>Add dummy match</button>
            <Table id="table-wrapper">
                <div id="table-scroll">
                        <TableHead id="table-header">
                            <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Player 1</TableCell>
                                    <TableCell>Faction 1</TableCell>
                                    <TableCell>Player 2</TableCell>
                                    <TableCell>Faction 2</TableCell>
                                    <TableCell>Winner</TableCell>
                            </TableRow>
                        </TableHead>
                        <tbody>
                            {matches.map(matchRenderCB)}
                        </tbody>
                </div>
                <div id="matches-more">
                    <p>Showing {matches.length} / {totalMatches} Matches</p>
                    <button onClick={moreMatchesACB}>More</button>
                </div>
            </Table>
        </div >
    )
}