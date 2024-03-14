import { observer } from "mobx-react-lite";
import React  from "react";

const HomeScreen = observer(
	function HomePresenter({model} : any) {
		return (
			<div>
				hyello {model.dailyWeatherLocation}
			</div>
		);
	}
);

export { HomeScreen }