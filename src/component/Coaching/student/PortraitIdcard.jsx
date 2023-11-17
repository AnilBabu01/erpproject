import React from "react";
import moment from "moment";
import style from "./LandscapeIdcard.module.css";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../config/config";

const PortraitIdcard = ({ data }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className={style.mainland}>
        <div className={style.maininfodiv10}>
          {data?.profileurl ? (
            <>
              <img
                alt="img"
                className={style.profileicon}
                src={`${backendUrl}public/upload/${data?.profileurl}`}
              />
            </>
          ) : (
            <>
              <img
                alt="img"
                className={style.profileicon}
                src="/images/profileimg.jpg"
              />
            </>
          )}
          <div className={style.infodivtext}>
            <p>Roll No : {data?.rollnumber} </p>
            <p>Student Name : {data?.name}</p>
            <p>Phono No : {data?.phoneno1} </p>
            <p>Father&apos;s name : {data?.fathersName} </p>
            <p>Father&apos;s No : {data?.fathersPhoneNo} </p>
            <p>Address : </p>
            <p>
              {data?.city} {data?.state} {data?.pincode}
            </p>
          </div>
        </div>
        <div className={style.headermain10}>
          <img
            className={style.logoicon}
            src={`${backendUrl}public/upload/${user?.data?.CredentailsData?.logourl}`}
            alt="Logo"
          />
          <div className={style.headertext}>
            <p>{user?.data?.CredentailsData?.institutename}</p>
            <p>
              {user?.data?.CredentailsData?.address}
              {user?.data?.CredentailsData?.city}
              {user?.data?.CredentailsData?.state} (
              {user?.data?.CredentailsData?.pincode})
            </p>
            <p>
              PH:
              {user?.data?.CredentailsData?.phoneno1}&lsquo;
              {user?.data?.CredentailsData?.phoneno2}&lsquo;
              {user?.data?.CredentailsData?.email}&lsquo;
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortraitIdcard;
