import { observer } from "mobx-react-lite";
import React from "react"
import { MatchView } from "../views/matchView.tsx";
import { Match } from "../model/match.ts"
import { addMatch } from "../Firebase.ts"

const MatchPres = observer(({match} : {match : Match}) => {
  addMatch(match);
    return (
      <div>
        <MatchView matchModel={match}>

        </MatchView>
      </div>
    )
});

export { MatchPres }