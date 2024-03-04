import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import React from "react";
import { addToFirestore } from "./Firebase.ts";
createRoot(document.getElementById("root")!).render(<App addToFirestore={addToFirestore}/>); // root element always 100% exists, no need to null check
