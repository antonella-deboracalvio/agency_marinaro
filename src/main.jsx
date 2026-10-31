import React from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./i18n/context";
import StartupReady from "./components/layout/StartupReady";
import App from "./App.jsx";
import "./styles/theme.css";
import "./index.css";

window.__marinaroBoot?.moduleReady();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider><App /><StartupReady /></LanguageProvider>
  </React.StrictMode>,
);
