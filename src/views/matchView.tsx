import React from "react";
import { Match } from "../model/match.ts";

export function MatchView({ match }: { match: Match }) {
  if (match.players.length > 2) {
    return (
      <div id="more-player-matches">
        3 or more player matches coming soon<sup>TM</sup>
      </div>
    )
  }
  return (
    <div id="match-wrapper">
      <div>
        {match.players[0]}
      </div>
    </div>
  );
}