import "@fontsource/inclusive-sans";
import "@fontsource/inclusive-sans/400-italic.css";
import "./globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./page.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import ErrorAlert from "./error.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Home />
        <ErrorAlert />
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
