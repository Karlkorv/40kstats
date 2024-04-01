import { observer } from "mobx-react-lite";
import React from "react"
import { MatchView } from "../views/matchView.tsx";
import { Match } from "../model/match.ts"
import { LeaderBoardModel } from "../model/LeaderboardModel.ts";
import { useParams } from "react-router-dom";

const MatchPresenter = observer(({ model }: { model: LeaderBoardModel }) => {
	const { matchId } = useParams()
	console.log("Trying to get match using id: ", matchId)
	model.setCurrentMatchById(matchId!)

	if (model.currentMatch === undefined) {
		return (
			<div>
				Match not found
			</div>
		)
	}

	return (
		<MatchView match={model.currentMatch} />
	)
});

export { MatchPresenter }