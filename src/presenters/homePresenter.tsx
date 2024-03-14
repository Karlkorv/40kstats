import { observer } from "mobx-react-lite";
import React  from "react";
import { MatchCreatorView } from "../views/matchCreatorView.tsx";

const HomeScreen = observer(
	function HomePresenter({model} : any) {
		function createMatchClick(evt){
			window.location.hash = "#/matchCreator"
		}

		return (
			<div>
				hyello {model.dailyWeatherLocation}

				<button onClick={createMatchClick}>Create a match</button>
			</div>
		);
	}
);

export { HomeScreen }