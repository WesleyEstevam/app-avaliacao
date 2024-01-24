import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ListaAvaliacoes from "./ListaAvaliacoes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ListaAvaliacoes />
  </React.StrictMode>
);
