import { Dialog, DialogContent, DialogContentText, DialogTitle, Paper } from "@mui/material";
import React from "react";

export function HelpButtonDialogView({open, onClose}){
    return(
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogContent>
                <DialogTitle>
                    <h1>Welcome to 40kstats!</h1>
                </DialogTitle>
                <DialogContentText>
                    This is a website used to track and register games for the popular board game <strong>Warhammer 40,000</strong>
                    <br></br>
                    <br></br>
                    On this website, you can <strong>create matches</strong>, look at <strong>previous matches</strong> and <strong>edit or remove existing matches</strong>.
                    <br></br>
                    <br></br>
                    <h3>Create a match:</h3> To create a match, you must first log-in using a Google account. Currently, matches only support two players.
                    <br></br>
                    When <strong>selecting users</strong>, you can either write in a custom name or username, or select from a list of users who are registered on the website. 
                    To appear in the list of registered users, you must select a unique username.
                    
                    <br></br>
                    <strong>Selecting a faction</strong> uses auto-complete. You can either write the name of the faction, or find it by scrolling through the list of available 
                    factions.
                    <br></br>
                    To <strong>select a winner</strong>, pick one of the two users in the match. The list of winners will be empty unless users have been specified.
                    <h3>Previous matches:</h3>
                    On the bottom of the webpage, there is a list of all previous matches created on the website. By <strong>clicking on a match</strong> you can see more 
                    information about the match. <strong>You can also filter matches</strong> by clicking on the different column names.
                    <h3>Editing a match:</h3> To edit or remove a match, click on the match from the list of Latest Matches. You can only edit or remove matches created by yourself.

                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}