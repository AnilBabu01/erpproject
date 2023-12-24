import React from "react";
import style from "./LandscapeCertificate.module.css";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../config/config";
import moment from "moment";
const PortraitCertificate = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className={style.maincertificate}>
        <div className={style.mainheadercer}>
          <div className={style.logotext}>
            <img
              className={style.logoicon}
              src={`${backendUrl}public/upload/${user?.data?.CredentailsData?.logourl}`}
              alt="Logo"
            />
            <div className={style.coachongname}>
              <i>{user?.data?.CredentailsData?.institutename}</i>
            </div>
          </div>

          <div className={style.coachingtextaddress}>
            <p>
              {user?.data?.CredentailsData?.address} &nbsp;
              {user?.data?.CredentailsData?.city} &nbsp;
              {user?.data?.CredentailsData?.state} &nbsp;(
              {user?.data?.CredentailsData?.pincode})
            </p>
            <p>
              PH:
              {user?.data?.CredentailsData?.phoneno1}&lsquo
              {user?.data?.CredentailsData?.phoneno2}&lsquo
              {user?.data?.CredentailsData?.email}&lsquo
            </p>
          </div>
        </div>
        <div className={style.coachingtextaddress}>
          <i className={style.comtext}>Diomola In Computer Application</i>
          {/* <p>
            *******************************************************************************************************************************************
          </p> */}
        </div>
        <div className={style.datecer}>
          <p>Certificate No : 11254555</p>
          <p>Date : 13/11/2023</p>
        </div>
        <div className={style.coachingtextaddress}>
          <p className={style.filldetails}>
            This is certify that Mr./Miss/Mrs……….DHARMENDRA SINGH………...…
            S/o&lsquoD/o&lsquoW/o&lsquoShri………….SURAJ PAL YADAV…............….Has completed the
            certificate/Diploma Course of……………………. Fundamental+ Microsoft office
            +Accounting(Tally)9.0 + Hindi & English Typing (Krutidev + Mangal
            Typing) Duration From…........12 JAN 2022….TO….12 JUL
            2022……..........…...…....
          </p>
        </div>
        <div className={style.signaturediv}>
          <div className={style.maintextdivgrade}>
            <div className={style.garcenter}>
              <i className={style.comtext20}>Grade</i>
              <i className={style.comtext20}>
                <span className={style.contextgrad}>“A”</span>
              </i>
            </div>
            <div className={style.garcenter}>
              <i className={style.comtext20}>Category</i>
              <i className={style.comtext20}>
                <span className={style.contextgrad}>“GOOD”</span>
              </i>
            </div>

            <div className={style.garcenter}>
              <i className={style.comtext20}>Course Name</i>
              <i className={style.comtext20}>
                <span className={style.contextgrad}>“DCA”</span>
              </i>
            </div>
          </div>

          <div className={style.signaturedivpft}>
            <img
              alt="img"
              className={style.profileicon}
              src="/images/profileimg.jpg"
            />
            <div className={style.sig}></div>
          </div>
        </div>
        <div className={style.asollated}>
          <p>Registration /Affiliation/collaboration by:-</p>
        </div>
        <div className={style.affilatediconmain}>
          <img
            alt="img"
            className={style.affilatedicon}
            src="/images/certiicon.png"
          />
          <img
            alt="img"
            className={style.affilatedicon}
            src="/images/certiicon.png"
          />
          <img
            alt="img"
            className={style.affilatedicon}
            src="/images/certiicon.png"
          />
          <img
            alt="img"
            className={style.affilatedicon}
            src="/images/certiicon.png"
          />
          <img
            alt="img"
            className={style.affilatedicon}
            src="/images/certiicon.png"
          />
        </div>
        <div className={style.sifnabypen}>
          <p>Teacher Signature:…………… </p>
          <p>Director Signature:……………</p>
        </div>
        <div className={style.maindivcalculate}>
          <p>
            Grade Criteria 100 {"<"}90=A+&lsquo90 {"<"}80 = A&lsquo80 {"<"} 70 = B+&lsquo70
            {"<"} 60 = B&lsquo60 {"<"} 33 = C
          </p>
        </div>
        <div className={style.footerdiv}>
          <p>
            {user?.data?.CredentailsData?.address} &nbsp;
            {user?.data?.CredentailsData?.city} &nbsp;
            {user?.data?.CredentailsData?.state} &nbsp;(
            {user?.data?.CredentailsData?.pincode})
          </p>
          <p>
            PH:
            {user?.data?.CredentailsData?.phoneno1}&lsquo
            {user?.data?.CredentailsData?.phoneno2}&lsquo
            {user?.data?.CredentailsData?.email}&lsquo
          </p>
        </div>
      </div>
    </>
  );
};

export default PortraitCertificate;
