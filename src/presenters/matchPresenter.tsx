import { observer } from "mobx-react-lite";
import React from "react"
import { MatchView } from "../views/matchView.tsx";
import { Match } from "../model/match.ts"
import { LeaderBoardModel } from "../model/LeaderboardModel.ts";
import { useParams } from "react-router-dom";

const MatchPresenter = observer(({ model }: { model: LeaderBoardModel }) => {
	const { matchId } = useParams()
	model.setCurrentMatchById(matchId!)

	function deleteMatch(matchID){
		model.deleteMatch(matchID);
		console.log("Deleting match with ID: " + matchID)
	}

	function editMatch(match: Match){
		let matchFormValues = {
			
		}
		model.editMatch(matchFormValues);
	}


	if (model.gettingCurrentMatch) {
		return (
			<div>
				Loading...
			</div>
		)
	}
	if (model.currentMatch === undefined) {
		return (
			<div>
				Match not found
			</div>
		)
	}

	return (
		<MatchView match={model.currentMatch} deleteMatch={deleteMatch} editMatch={editMatch}/>
	)
});

export { MatchPresenter }