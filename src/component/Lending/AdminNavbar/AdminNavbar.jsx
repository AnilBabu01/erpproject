import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminNavbar = () => {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user?.data?.User?.userType === "admin" && (
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
                router.pathname == "/mainadmin/client/allclient"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/mainadmin/client/allclient"
            >
              Clients
            </Link>
          </div>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <div>
            <Link
              className={
                router.pathname == "/mainadmin/activeclient/allactiveclient"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/mainadmin/activeclient/allactiveclient"
            >
              Active Plans
            </Link>
          </div>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <div>
            <Link
              className={
                router.pathname ==
                "/mainadmin/exhaustedclient/allexhaustedclient"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/mainadmin/exhaustedclient/allexhaustedclient"
            >
              Exhausted Plans
            </Link>
          </div>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <div>
            <Link
              className={
                router.pathname == "/mainadmin/guestclients/allguestclients"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/mainadmin/guestclients/allguestclients"
            >
              Guest Clients
            </Link>
          </div>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <div>
            <Link
              className={
                router.pathname == "/school/masters/AddSession"
                  ? "link_directActive"
                  : "link_direct"
              }
              href="/school/masters/AddSession"
            >
              Session
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default AdminNavbar;
