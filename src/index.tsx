import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import React from "react";
createRoot(document.getElementById("root")!).render(<App />); // root element always 100% exists, no need to null check
