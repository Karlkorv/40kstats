import { observer } from "mobx-react-lite";
import { LeaderBoardModel } from "../model/LeaderboardModel.ts";
import { TournamentView } from "../views/tournamentView.tsx";

const Tournament = observer(({ model }: { model: LeaderBoardModel }) => {
    return <TournamentView />;
});

export { Tournament };
