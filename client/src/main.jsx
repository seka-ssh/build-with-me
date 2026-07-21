import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { ProjectProvider } from "./components/context/ProjectContext.jsx";
import { ThemeProvider } from "./components/context/ThemeContext.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <ProjectProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ProjectProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
