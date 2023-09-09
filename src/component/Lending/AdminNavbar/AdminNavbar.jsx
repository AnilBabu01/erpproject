import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminNavbar = () => {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user?.data[0]?.userType === "admin" && (
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
              Dashboard
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
              Clients
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
              Active Plans
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
              Exhausted Plans
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
              Guest Clients
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default AdminNavbar;
