import "@/styles/globals.css";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import Main from "./main";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Main Component={Component} pageProps={pageProps} />
      </Provider>
    </>
  );
}
