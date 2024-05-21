import { observer } from "mobx-react-lite";
import React from "react";
import { HelpButtonDialogView } from "../views/helpButtonDialogView.tsx";
import { LeaderBoardModel } from "../model/LeaderboardModel.tsx";

export const HelpButtonDialog = observer(
    ({ model }: { model: LeaderBoardModel }) => {
        function handleCloseDialog() {
            model.handleCloseDialog();
        }

        return (
            <HelpButtonDialogView
                open={model.helpTextOpen}
                onClose={handleCloseDialog}
            ></HelpButtonDialogView>
        );
    }
);
