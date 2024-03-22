import { observer } from "mobx-react-lite";
import React from "react"
import { MatchView } from "../views/matchView.tsx";
import { Match } from "../model/match.ts"

const Match = observer(({match} : {match : Match}) => {
    return (
      <div>
        <MatchView matchModel={match}>

        </MatchView>
      </div>
    )
});

export { Match }