import React, { useState } from "react";
import {
    DoubleEliminationBracket,
    Match,
    SVGViewer,
} from "@g-loot/react-tournament-brackets";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
    Chip,
} from "@mui/material";
import {
    Add,
    Delete,
    Edit,
    Visibility,
    EmojiEvents,
} from "@mui/icons-material";

export function TournamentView() {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [tournamentName, setTournamentName] = useState("");
    const [numPlayers, setNumPlayers] = useState(4);
    const [playerNames, setPlayerNames] = useState<string[]>([]);

    // Placeholder data for demonstration - will be replaced with actual data from presenter
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

    const handleCreateClick = () => {
        setCreateDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setCreateDialogOpen(false);
        setTournamentName("");
        setNumPlayers(4);
        setPlayerNames([]);
    };

    const handleCreateTournament = () => {
        // Placeholder - will be connected to presenter logic
        console.log("Creating tournament:", {
            name: tournamentName,
            numPlayers,
            playerNames,
        });
        handleCloseDialog();
    };

    const handleViewTournament = (tournamentId: string) => {
        // Placeholder - will be connected to presenter logic
        console.log("View tournament:", tournamentId);
    };

    const handleEditTournament = (tournamentId: string) => {
        // Placeholder - will be connected to presenter logic
        console.log("Edit tournament:", tournamentId);
    };

    const handleDeleteTournament = (tournamentId: string) => {
        // Placeholder - will be connected to presenter logic
        console.log("Delete tournament:", tournamentId);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ONGOING":
                return "primary";
            case "FINISHED":
                return "success";
            case "STALE":
                return "warning";
            case "ABORTED":
                return "error";
            default:
                return "default";
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 4,
                maxWidth: 1200,
                margin: "0 auto",
            }}
        >
            {/* Header Section */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 4,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <EmojiEvents sx={{ fontSize: 40, color: "#9c1116" }} />
                    <Typography variant="h3" component="h1">
                        Tournaments
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleCreateClick}
                    size="large"
                >
                    Create New Tournament
                </Button>
            </Box>

            {/* Tournaments Grid */}
            {tournaments.length === 0 ? (
                <Box
                    sx={{
                        textAlign: "center",
                        padding: 8,
                        width: "100%",
                    }}
                >
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        No tournaments yet
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Create your first tournament to get started!
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3} sx={{ width: "100%" }}>
                    {tournaments.map((tournament) => (
                        <Grid item xs={12} sm={6} md={4} key={tournament.id}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    "&:hover": {
                                        boxShadow: 6,
                                        transform: "translateY(-4px)",
                                        transition: "all 0.3s ease",
                                    },
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "start",
                                            marginBottom: 2,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            component="h2"
                                            gutterBottom
                                        >
                                            {tournament.name}
                                        </Typography>
                                        <Chip
                                            label={tournament.status}
                                            color={getStatusColor(
                                                tournament.status
                                            )}
                                            size="small"
                                        />
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Players:{" "}
                                        {tournament.startingPositions.flat()
                                            .length}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Matches: {tournament.matches.length}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    sx={{
                                        justifyContent: "flex-end",
                                        padding: 2,
                                        paddingTop: 0,
                                    }}
                                >
                                    <Button
                                        size="small"
                                        startIcon={<Visibility />}
                                        onClick={() =>
                                            handleViewTournament(tournament.id)
                                        }
                                    >
                                        View
                                    </Button>
                                    <Button
                                        size="small"
                                        startIcon={<Edit />}
                                        onClick={() =>
                                            handleEditTournament(tournament.id)
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() =>
                                            handleDeleteTournament(tournament.id)
                                        }
                                    >
                                        <Delete />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Create Tournament Dialog */}
            <Dialog
                open={createDialogOpen}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <EmojiEvents />
                        <Typography variant="h6">
                            Create New Tournament
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            paddingTop: 2,
                        }}
                    >
                        {/* Tournament Name */}
                        <TextField
                            fullWidth
                            label="Tournament Name"
                            value={tournamentName}
                            onChange={(e) => setTournamentName(e.target.value)}
                            placeholder="e.g., Summer Championship 2026"
                            helperText="Enter a descriptive name for your tournament"
                        />

                        {/* Number of Players */}
                        <FormControl fullWidth>
                            <InputLabel id="num-players-label">
                                Number of Players
                            </InputLabel>
                            <Select
                                labelId="num-players-label"
                                value={numPlayers}
                                label="Number of Players"
                                onChange={(e) =>
                                    setNumPlayers(Number(e.target.value))
                                }
                            >
                                <MenuItem value={4}>4 Players</MenuItem>
                                <MenuItem value={8}>8 Players</MenuItem>
                                <MenuItem value={16}>16 Players</MenuItem>
                                <MenuItem value={32}>32 Players</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Player Names Input */}
                        <Box>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                color="text.secondary"
                            >
                                Starting Positions (Optional)
                            </Typography>
                            <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                color="text.secondary"
                            >
                                Add player names to set up brackets. You can also
                                do this later.
                            </Typography>
                            <Grid container spacing={2} sx={{ marginTop: 1 }}>
                                {Array.from({ length: numPlayers }).map(
                                    (_, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label={`Player ${index + 1}`}
                                                value={playerNames[index] || ""}
                                                onChange={(e) => {
                                                    const newNames = [
                                                        ...playerNames,
                                                    ];
                                                    newNames[index] =
                                                        e.target.value;
                                                    setPlayerNames(newNames);
                                                }}
                                                placeholder={`Player ${
                                                    index + 1
                                                }`}
                                            />
                                        </Grid>
                                    )
                                )}
                            </Grid>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ padding: 3, paddingTop: 1 }}>
                    <Button onClick={handleCloseDialog} variant="outlined">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateTournament}
                        variant="contained"
                        disabled={!tournamentName.trim()}
                        startIcon={<Add />}
                    >
                        Create Tournament
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
