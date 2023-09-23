import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const ParentNavbar = () => {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user?.data[0]?.userType === "parent" && (
        <>
          <div>
            <Link
              className={
                router.pathname == "/parent/dashboard"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/parent/dashboard"
            >
              Home
            </Link>
          </div>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <div>
            <Link
              className={
                router.pathname == "/parent/attendance"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/parent/attendance"
            >
              Attendance
            </Link>
          </div>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <div>
            <Link
              className={
                router.pathname == "/parent/fee"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/parent/fee"
            >
              Fee
            </Link>
          </div>
          {/* &nbsp;&nbsp; &nbsp;&nbsp;
          <div>
            <Link
              className={
                router.pathname == "/parent/transport"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/parent/transport"
            >
              Transport
            </Link>
          </div> */}
          {/* &nbsp;&nbsp; &nbsp;&nbsp;
          <div>
            <Link
              className={
                router.pathname == "/mainadfmin/library"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/mainadmixn/library"
            >
              Library
            </Link>
          </div> */}
        </>
      )}
    </>
  );
};

export default ParentNavbar;
