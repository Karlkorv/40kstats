import { observer } from "mobx-react-lite";
import { LeaderBoardModel } from "../model/LeaderboardModel.ts";
import { TournamentView } from "../views/tournamentView.tsx";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

const Tournament = observer(({ model }: { model: LeaderBoardModel }) => {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [tournamentName, setTournamentName] = useState("");
    const [numPlayers, setNumPlayers] = useState(4);
    const [playerNames, setPlayerNames] = useState<string[]>([]);

    // Placeholder data for demonstration - will be replaced with actual data from model
    const tournaments = [
        {
            id: "1",
            name: "Summer Championship 2026",
            status: "ONGOING",
            startingPositions: [
                ["Player 1", "Player 2"],
                ["Player 3", "Player 4"],
            ],
            matches: [],
        },
        {
            id: "2",
            name: "Winter League",
            status: "FINISHED",
            startingPositions: [
                ["Player A", "Player B"],
                ["Player C", "Player D"],
            ],
            matches: [],
        },
    ];

    function handleCreateClick() {
        setCreateDialogOpen(true);
    }

    function handleCloseDialog() {
        setCreateDialogOpen(false);
        setTournamentName("");
        setNumPlayers(4);
        setPlayerNames([]);
    }

    function handleCreateTournament() {
        // Placeholder - will be connected to model logic
        console.log("Creating tournament:", {
            name: tournamentName,
            numPlayers,
            playerNames,
        });
        handleCloseDialog();
    }

    function handleViewTournament(tournamentId: string) {
        // Placeholder - will be connected to model logic
        console.log("View tournament:", tournamentId);
    }

    function handleEditTournament(tournamentId: string) {
        // Placeholder - will be connected to model logic
        console.log("Edit tournament:", tournamentId);
    }

    function handleDeleteTournament(tournamentId: string) {
        // Placeholder - will be connected to model logic
        console.log("Delete tournament:", tournamentId);
    }

    function handleTournamentNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTournamentName(e.target.value);
    }

    function handleNumPlayersChange(e: SelectChangeEvent<number>) {
        setNumPlayers(Number(e.target.value));
    }

    function handlePlayerNameChange(value: string, index: number) {
        const newNames = [...playerNames];
        newNames[index] = value;
        setPlayerNames(newNames);
    }

    return (
        <TournamentView
            tournaments={tournaments}
            createDialogOpen={createDialogOpen}
            tournamentName={tournamentName}
            numPlayers={numPlayers}
            playerNames={playerNames}
            handleCreateClick={handleCreateClick}
            handleCloseDialog={handleCloseDialog}
            handleCreateTournament={handleCreateTournament}
            handleViewTournament={handleViewTournament}
            handleEditTournament={handleEditTournament}
            handleDeleteTournament={handleDeleteTournament}
            handleTournamentNameChange={handleTournamentNameChange}
            handleNumPlayersChange={handleNumPlayersChange}
            handlePlayerNameChange={handlePlayerNameChange}
        />
    );
});

export { Tournament };
