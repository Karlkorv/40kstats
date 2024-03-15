import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import React from "react";
import { LeaderBoardModel } from "./model/LeaderboardModel.ts";

const model = new LeaderBoardModel()

createRoot(document.getElementById("root")!).render(<App model={model} />); // root element always 100% exists, no need to null check

