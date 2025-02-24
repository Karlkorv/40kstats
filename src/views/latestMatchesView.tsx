import React from "react";
import { Match } from "../model/match.ts";
import { User } from "firebase/auth";
import {
    Box,
    FormControlLabel,
    Switch,
    TextField,
    Tooltip,
} from "@mui/material";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import dayjs from "dayjs";

const columns: GridColDef[] = [
    {
        field: "date",
        headerClassName: "grid-column-class",
        headerName: "Date",
        flex: 1,
    },
    {
        field: "player_1",
        headerClassName: "grid-column-class",
        headerName: "Player 1",
        flex: 1,
    },
    {
        field: "faction_1",
        headerClassName: "grid-column-class",
        headerName: "Faction 1",
        flex: 1,
    },
    {
        field: "player_2",
        headerClassName: "grid-column-class",
        headerName: "Player 2",
        flex: 1,
    },
    {
        field: "faction_2",
        headerClassName: "grid-column-class",
        headerName: "Faction 2",
        flex: 1,
    },
    {
        field: "winner",
        headerClassName: "grid-column-class",
        headerName: "Winner",
        flex: 1,
    },
    {
        field: "creator",
        headerName: "Creator",
        flex: 1,
    },
];

export function LastestMatchesView({
    matchClicked,
    matches,
    moreMatches,
    totalMatches,
    user,
    username,
    userFilter,
    toggleUserFilter,
    playerFilter,
    togglePlayerFilter,
    handleSearchInput,
}: {
    matchClicked: (match: string) => void;
    matches: Match[];
    moreMatches: (amt?: number) => void;
    totalMatches: number;
    user: User | null;
    username: string | null;
    userFilter: boolean;
    toggleUserFilter: any;
    playerFilter: boolean;
    togglePlayerFilter: any;
    handleSearchInput: any;
}) {
    const userFilterModel: GridFilterModel = {
        items: [
            { id: 1, field: "creator", operator: "equals", value: user?.uid },
        ],
    };

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
            creator: match.userID,
        };
    }

    return (
        <div>
            <Box sx={{ paddingBottom: 1, display: "flex", width: "100%" }}>
                <Tooltip title={user ? "" : "You need to sign in."}>
                    <span>
                        <FormControlLabel
                            control={
                                <Switch
                                    disabled={!user}
                                    checked={userFilter}
                                    onChange={toggleUserFilter}
                                />
                            }
                            label={"Only show matches created by me."}
                            labelPlacement="bottom"
                        />
                    </span>
                </Tooltip>
                <Tooltip
                    title={username ? "" : "You need to select a username."}
                >
                    <span>
                        <FormControlLabel
                            control={
                                <Switch
                                    disabled={!username}
                                    checked={playerFilter}
                                    onChange={togglePlayerFilter}
                                />
                            }
                            label={"Only show matches played by me."}
                            labelPlacement="bottom"
                        />
                    </span>
                </Tooltip>
                <Box sx={{ textAlign: "right", marginLeft: "auto" }}>
                    <TextField
                        label="Search players"
                        color="primary"
                        variant="outlined"
                        onInput={handleSearchInput}
                    ></TextField>
                </Box>
            </Box>
            <DataGrid
                sx={{
                    maxHeight: 500,
                    "& .MuiDataGrid.cell:focus, & .MuiDataGrid-cell:focus-within":
                        { outline: "none" },
                    "& .MuiDataGrid-row:hover": { cursor: "pointer" },
                }}
                rows={matches.map(matchRenderCB)}
                columns={columns}
                columnVisibilityModel={{
                    creator: false,
                }}
                filterModel={userFilter ? userFilterModel : { items: [] }}
                /* filterModel={playerFilterModel} */
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
