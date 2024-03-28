import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import React from "react";
import { LeaderBoardModel } from "./model/LeaderboardModel.ts";

const model = new LeaderBoardModel();

// Måste casta window för att typescript inte ska klaga här
(window as any).myModel = model;

createRoot(document.getElementById("root")!).render(<App model={model} />); // root element always 100% exists, no need to null check

