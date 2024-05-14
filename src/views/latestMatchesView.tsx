import React from "react";
import { Match } from "../model/match.ts";
import { toJS } from "mobx";
import { User } from "firebase/auth";
import {
    Box,
    styled,
    Table,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import dayjs from "dayjs";

const columns: GridColDef[] = [
    {
        field: "date",
        headerName: "Date",
        flex: 1,
    },
    {
        field: "player_1",
        headerName: "Player 1",
        flex: 1,
    },
    {
        field: "faction_1",
        headerName: "Faction 1",
        flex: 1,
    },
    {
        field: "player_2",
        headerName: "Player 2",
        flex: 1,
    },
    {
        field: "faction_2",
        headerName: "Faction 2",
        flex: 1,
    },
    {
        field: "winner",
        headerName: "Winner",
        flex: 1,
    },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
}));

export function LastestMatchesView({
    matchClicked,
    matches,
    moreMatches,
    totalMatches,
    user,
}: {
    matchClicked: (match: string) => void;
    matches: Match[];
    moreMatches: (amt?: number) => void;
    totalMatches: number;
    user: User | null;
}) {
    function moreMatchesACB() {
        moreMatches(10);
    }

    function matchRowClickedACB(matchID) {
        matchClicked(matchID);
    }
    function matchRenderCB(match: Match) {
        return {
            id: match.matchID || "tempID",
            date: dayjs(match.date).format("YYYY/MM/DD"),
            player_1: match.players[0],
            faction_1: match.factions[0],
            player_2: match.players[1],
            faction_2: match.factions[1],
            winner: match.winners[0],
        };
    }

    return (
        <div>
            <DataGrid
                sx={{
                    maxHeight: 500,
                    "& .MuiDataGrid.cell:focus, & .MuiDataGrid-cell:focus-within":
                        { outline: "none" },
                    "& .MuiDataGrid-row:hover": { cursor: "pointer" },
                }}
                rows={matches.map(matchRenderCB)}
                columns={columns}
                disableColumnResize
                disableColumnMenu
                disableRowSelectionOnClick
                rowSelection={false}
                hideFooter
                onRowClick={(row) => matchRowClickedACB(row.id)}
            ></DataGrid>
        </div>
    );
}
