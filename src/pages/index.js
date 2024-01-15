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
import Features from "@/component/Lending/Features/Features";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/component/Lending/Home/Footer";
import ClientSay from "@/component/Lending/Home/ClientSay";
export default function Home({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [loadingshow, setLoadingshow] = useState(false);

  useEffect(() => {
    setLoadingshow(true);
    setTimeout(() => {
      setLoadingshow(false);
    }, 10);

    // Initialize AOS here
    AOS.init({});
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  if (isAuthenticated) {
    // if (user?.data?.User?.newclient === true) {
    //   navigate.push("/pricing");
    // } else {
    if (user?.data?.User?.userType === "school") {
      navigate.push("/school/dashboard");
    }
    if (user?.data?.User?.userType === "college") {
      navigate.push("/college/dashboard");
    }
    if (user?.data?.User?.userType === "institute") {
      navigate.push("/coaching/dashboard");
    }

    if (user?.data?.User?.userType === "admin") {
      navigate.push("/mainadmin/dashboard");
    }

    if (user?.data?.User?.userType === "employee") {
      navigate.push("/employee/dashboard");
    }
    if (user?.data?.User?.userType === "student") {
      navigate.push("/student/dashboard");
    }
    if (user?.data?.User?.userType === "parent") {
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
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          nomodule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        ></script>
      </Head>
      <div className="mainContainer">
        <div className={styles.mianguest}>
          <div className={styles.left}>
            <h1>
              Enterprise resource planning (ERP) refers to a type of software
              that organizations use to manage day-to-day business activities
              such as accounting, procurement, project management, risk
              management and compliance, and supply chain operations. So We here
              &quot;Abtechzone&quot; Team offer you a brilliant and management
              experience
            </h1>
            <button onClick={() => setOpen(true)}>Get Started</button>
          </div>
          <div className={styles.right}>
            <img src="/images/erp1.webp" alt="Logo" />
          </div>
          <button className={styles.phonebutton} onClick={() => setOpen(true)}>
            Get Started
          </button>
        </div>
        {/* <Features /> */}
        <FeatureRrp />
        {/* <MainSlide /> */}
        <ClientSay />
        {/* footer call and main  */}
        <div className={styles.contactDetail}>
          <div className={styles.mailContact}>
            <a href="mailto: abtechzone46@gmail.com" target="_blank">
              <div className={styles.contactImage}>
                <img src="/images/mail.jpg" alt="Mail" />
              </div>
            </a>
            <div>
              <a href="mailto: abtechzone46@gmail.com" target="_blank">
                <div className={styles.contectText}>
                  <p>Email us at</p>
                </div>
                <div className={styles.contectNumber}>
                  <p>abtechzone46@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
          <div className={styles.mailContact}>
            <a href="https://wa.me/917505786956" target="_blank">
              <div className={styles.contactImage}>
                <img src="/images/whatsapp.jpg" alt="whatsApp" />
              </div>
            </a>
            <div>
              <a href="https://wa.me/917505786956" target="_blank">
                <div className={styles.contectText}>
                  <p>Whatsapp or Call us on</p>
                </div>
                <div className={styles.contectNumber}>
                  <p>+91 7505786956</p>
                </div>
              </a>
            </div>
          </div>
          <div className={styles.gapColum}></div>
          <div className={styles.gapColum}></div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
