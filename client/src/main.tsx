import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App.tsx";

import { Provider } from "react-redux";
import { store } from "@/redux/store.ts";

import "@/styles/style.scss";

import { DarkModeProvider } from "./context/DarkModeProvider.tsx";
import { MenuContextProvider } from "./context/navContext.tsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
        <MenuContextProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </MenuContextProvider>
      </DarkModeProvider>
    </Provider>
  </React.StrictMode>
);
