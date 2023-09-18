import React, { useState, useEffect } from "react";
import Navbar from "../component/Lending/Navbar/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/authActions";
function Main({ Component, pageProps }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loadingshow, setLoadingshow] = useState(true);

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoadingshow(false);
    }, 1000);
  }, []);

  return (
    <>
      <Navbar setOpen={setOpen} open={open} setLoadingshow={setLoadingshow} />
      <NextUIProvider>
        <Component {...pageProps} setOpen={setOpen} open={open} />
      </NextUIProvider>
    </>
  );
}

export default Main;
