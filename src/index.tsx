import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import {initializeModel} from "./model/LeaderboardModel.ts";
import React from "react";

const model = initializeModel();

createRoot(document.getElementById("root")!).render(<App model={model} />); // root element always 100% exists, no need to null check
