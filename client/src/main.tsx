import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App.tsx";

import { Provider } from "react-redux";
import { store } from "@/redux/store.ts";

import "@/styles/style.scss";

import { DarkModeContextProvider } from "./context/darkModeContext.tsx";
import { MenuContextProvider } from "./context/navContext.tsx";
import { HelmetProvider } from "react-helmet-async";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then(
      (registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      (err) => {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <MenuContextProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </MenuContextProvider>
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>
);
