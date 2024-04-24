import { observer } from "mobx-react-lite";
import React from "react";
import { LeaderBoardModel } from "../model/LeaderboardModel";

const HomeScreen = observer(
	function HomePresenter({ model }: { model: LeaderBoardModel }) {
		function createMatchClick(evt) {
			model.startMatchCreation();
			window.location.hash = "#/matchCreator"
		}

		return (
			<div>
			</div>
		);
	}
);

export { HomeScreen }