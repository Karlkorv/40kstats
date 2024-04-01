import { observer } from "mobx-react-lite";
import React from "react"
import { MatchView } from "../views/matchView.tsx";
import { Match } from "../model/match.ts"
import { LeaderBoardModel } from "../model/LeaderboardModel.ts"

const MatchPres = observer((model : LeaderBoardModel) => {

    return (
      <div>
        <MatchView
          matchModel={new Match([],[],[],[],[])}>
        </MatchView>
      </div>
    )
});

export { MatchPres }