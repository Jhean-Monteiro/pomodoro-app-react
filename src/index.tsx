// ponto de entrada 
// createRoot substitui o antigo ReactDDOM.render

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// busca o elemento root do index.html (criado pelo CRA/Vite)
const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Elemento #root não encontrado no index.html");
}

// conceito: createRoot é a API moderna do React 18
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)