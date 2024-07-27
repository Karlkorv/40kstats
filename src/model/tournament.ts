import { Match } from "./match.ts";

export class Tournament {
    matches: Match[];
    tournamentID: string | undefined; // Sätts av firebase
    winnerId: string | undefined; // Osatt om turneringen inte är avslutad
    creationDate: Date;
    name: string;

    constructor(matches: Match[], name: string, winnerId?: string) {
        this.matches = matches;
        this.creationDate = new Date();
        this.name = name;
        this.winnerId = winnerId;
    }

    /**
     * Returnerar en array med alla matcher som en spelare har spelat i turneringen, kompatibelt för React Tournaments
     */
    public ReactCompatibleMatches() {
        throw new Error("Not implemented");
    }
}