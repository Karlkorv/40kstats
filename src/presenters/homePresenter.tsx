import { observer } from "mobx-react-lite";
import React from "react";
import { MatchCreatorView } from "../views/matchCreatorView.tsx";
import { Match } from "../model/match.ts";
import { FACTIONS } from "../model/factions.ts";

const HomeScreen = observer(
	function HomePresenter({ model }: any) {
		function createMatchClick(evt) {
			model.startMatchCreation();
			window.location.hash = "#/matchCreator"
		}

		function addDummyMatch() {
			model.addMatch(new Match(
				["Janne", "Johan"],
				[FACTIONS.ADEPTUS_MECHANICUS, FACTIONS.AELDARI],
				["Janne"],
				[10, 0], [0, 0])
			);
		}

		return (
			<div>
				<button onClick={addDummyMatch}>Add dummy match</button>
				<button onClick={createMatchClick}>Create a match</button>
			</div>
		);
	}
);

export { HomeScreen }