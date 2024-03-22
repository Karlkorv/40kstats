import React from "react";
import {Match} from "../model/match.ts"

export function MatchView(matchModel : Match) {
  return (
    <div>
      Number of players: {matchModel.players.length}
      Players: {matchModel.players}
      Factions: {matchModel.factions}
      Winners: {matchModel.winners}

      First place: 
    </div>
  )
}