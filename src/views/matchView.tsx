import React from "react";
import { Match } from "../model/match.ts";

export function MatchView({ matchModel }: { matchModel: Match }) {
  return (
    <div>
      Game ID: {matchModel.matchID}
      Game date: {matchModel.date.toString()}
      Number of players: {matchModel.players.length}
      Players: {matchModel.players}
      Factions: {matchModel.factions}
      Winners: {matchModel.winners}

      First place: 
    </div>
  );
}