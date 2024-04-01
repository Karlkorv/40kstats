import React from "react";
import { Match } from "../model/match.ts";

export function MatchView({ match }: { match: Match }) {
  return (
    <div>
      Game date: {match.date.toString()}
      Number of players: {match.players.length}
      Players: {match.players}
      Factions: {match.factions}
      Winners: {match.winners}
    </div>
  );
}