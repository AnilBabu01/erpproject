import React from "react";
import moment from "moment";
import style from "../student/LandscapeIdcard.module.css";
import { useSelector } from "react-redux";
import { backendUrl } from "../../../config/config";

const LandscapeIdcardEmployee = ({ data }) => {
  const { user } = useSelector((state) => state.auth);

  console.log("employee data is ", data);

  return (
    <>
      <div className={style.mainland}>
        <div className={style.headermain}>
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
              {user?.data?.CredentailsData?.phoneno1},
              {user?.data?.CredentailsData?.phoneno2},
              {user?.data?.CredentailsData?.email},
            </p>
          </div>
        </div>
        <div className={style.maininfodiv}>
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
            <p>Employee Id : 1 </p>
            <p>Emplyee Name : {data?.name} </p>
            <p>
              Phono No : {data?.phoneno1} ,{data?.phoneno2}
            </p>
            <p>Department : {data?.department}</p>
            <p>Deignation : {data?.employeeof}</p>
            <p>Address : </p>
            <p>
              {data?.address}
              {data?.city}
              {data?.pincode}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandscapeIdcardEmployee;
