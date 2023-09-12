import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/loginguest.module.css";
import FeatureRrp from "../component/Lending/Home/FeatureRrp";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/actions/authActions";
import {
  alCoaching,
  allschool,
  allCollege,
  allClient,
} from "../redux/actions/commanAction";
import Loader from "@/component/loader/Loader";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Home({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [loadingshow, setLoadingshow] = useState(false);

  useEffect(() => {
    setLoadingshow(true);
    setTimeout(() => {
      setLoadingshow(false);
    }, 1000);

    // Initialize AOS here
    AOS.init({});
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  if (isAuthenticated) {
    if (user?.data[0]?.newclient === true) {
      navigate.push("/pricing");
    } else {
      if (user?.data[0]?.userType === "school") {
        navigate.push("/school/dashboard");
      }
      if (user?.data[0]?.userType === "college") {
        navigate.push("/college/dashboard");
      }
      if (user?.data[0]?.userType === "institute") {
        navigate.push("/coaching/dashboard");
      }
    }
    if (user?.data[0]?.userType === "admin") {
      navigate.push("/mainadmin/dashboard");
    }

    if (user?.data[0]?.userType === "employee") {
      navigate.push("/employee/dashboard");
    }
    if (user?.data[0]?.userType === "student") {
      navigate.push("/student/dashboard");
    }
    if (user?.data[0]?.userType === "parent") {
      navigate.push("/parent/dashboard");
    }
  }

  useEffect(() => {
    dispatch(alCoaching());
    dispatch(allCollege());
    dispatch(allschool());
    dispatch(allClient());
  }, []);

  return (
    <main>
      <Head>
        <title>Home</title>
      </Head>
      {loadingshow?<>
      <Loader/>
      
      </>:<>
      
      <div className="mainContainer8">
        <div className={styles.mianguest}>
          <div className={styles.left}>
            <h1>
              Enterprise resource planning (ERP) refers to a type of software
              that organizations use to manage day-to-day business activities
              such as accounting, procurement, project management, risk
              management and compliance, and supply chain operations.
            </h1>
            <button onClick={() => setOpen(true)}>Get Started</button>
          </div>
          <div className={styles.right}>
            <img src="/images/erp.jpeg" alt="Logo" />
          </div>
          <button
            className={styles.phonebutton}
            onClick={() => setOpen(true)}
          >
            Get Started
          </button>
        </div>
        <FeatureRrp />
      </div>
      
      </>}
     
    </main>
    )
}
