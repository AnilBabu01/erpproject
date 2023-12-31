import Link from "next/link";
import React from "react";
import footerLogo from "../../../assets/images/logoblue1.png";
import styles from "./Footer.module.css";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdCall } from "react-icons/md";
import { SiGmail } from "react-icons/si";

export const navLinkData = [
  {
    _id: 1001,
    title: "Home",
    link: "features",
  },
  {
    _id: 1002,
    title: "About",
    link: "about",
  },
  {
    _id: 1003,
    title: "Learning",
    link: "kits",
  },
  {
    _id: 1004,
    title: "Help Center",
    link: "sensors",
  },
];
const Footer = () => {
  return (
    <>
      <div className={styles.Footer}>
        <div className={styles.f}>
          <Link href="/">
            <Image
            alt="ijmf"
              className={styles.FooterLogo}
              src={footerLogo}
              height={100}
              width={150}
            />
          </Link>
          <div></div>
          <div className={styles.Logo}>
            <div className={styles.footerIcon}>
              <span>
                <a href="">
                  <FaFacebookF />
                </a>
              </span>
              <span>
                <a href="">
                  <FaInstagram />
                </a>
              </span>
              <span>
                <a href="">
                  <FaTwitter />
                </a>
              </span>
              <span>
                <a href="">
                  <FaLinkedinIn />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.FooterLink}>
            <ul>
              {navLinkData.map(({ _id, title, link }) => (
                <li key={_id}>
                  <Link
                    href={link}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    spy={true}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.MainAddressDetails}>
          <h1>ABTECHZONE TEAM</h1>
          <div className={styles.footerAddress}>
            <div>
              <div className={styles.contactdetails}>
                <span className={styles.contacticon}>
                  <a href="">
                    <IoMdHome />
                  </a>
                </span>
                Bajpai Institute of Computer Science and Web Developers ,in
                front of state bank pilibhit road branch , Bisalpur (Pilibhit),
                UP-262201
              </div>
            </div>
            <div>
              <div className={styles.contactdetails}>
                <span className={styles.contacticon}>
                  <a href="">
                    <MdCall />
                  </a>
                </span>
                +91 7505786956
              </div>
            </div>
            <div>
              <div className={styles.contactdetails}>
                <span className={styles.contacticon}>
                  <a href="">
                    <MdCall />
                  </a>
                </span>
                +91 8923361130
              </div>
            </div>
            <div>
              <div className={styles.contactdetails}>
                <span className={styles.contacticon}>
                  <a href="">
                    <MdCall />
                  </a>
                </span>
                +91 9336695769
              </div>
            </div>
            <div>
              <div className={styles.contactdetails}>
                <span className={styles.contacticon}>
                  <a href="">
                    <SiGmail />
                  </a>
                </span>
                abtehzone46@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
