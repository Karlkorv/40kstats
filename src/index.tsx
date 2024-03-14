import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { model } from "./model/LeaderboardModel.ts"
import React from "react";
import { createElement } from "react"
import {observable, configure, reaction} from "mobx"

const reactiveModel = observable(model)
createRoot(document.getElementById("root")!).render(<App model={reactiveModel}/>); // root element always 100% exists, no need to null check

