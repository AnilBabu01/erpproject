import React, { useState, useEffect } from "react";
import Navbar from "../component/Lending/Navbar/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/authActions";
function Main({ Component, pageProps }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <Navbar setOpen={setOpen} open={open} />
      <NextUIProvider>
        <Component {...pageProps} setOpen={setOpen} open={open} />
      </NextUIProvider>
      <ToastContainer />
    </>
  );
}

export default Main;
