import "@/styles/globals.css";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import Main from "../provider/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Main Component={Component} pageProps={pageProps} />
        <ToastContainer position="top-center" />
      </Provider>
    </>
  );
}
