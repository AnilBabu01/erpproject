import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const StudentNavbar = () => {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user?.data[0]?.userType === "student" && (
        <>
          <div>
            <Link
              className={
                router.pathname == "/mainadmin/dashbord"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/mainadmin/dashboard"
            >
              Home
            </Link>
          </div>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <div>
            <Link
              className={
                router.pathname == "/mainadfmin/dashbord"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/mainadmixn/dashbord"
            >
              Attendance
            </Link>
          </div>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <div>
            <Link
              className={
                router.pathname == "/mainadfmin/dashbord"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/mainadmixn/dashbord"
            >
              Fee
            </Link>
          </div>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <div>
            <Link
              className={
                router.pathname == "/mainadfmin/dashbord"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/mainadmixn/dashbord"
            >
              Transport
            </Link>
          </div>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <div>
            <Link
              className={
                router.pathname == "/mainadfmin/dashbord"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/mainadmixn/dashbord"
            >
              Library
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default StudentNavbar;
