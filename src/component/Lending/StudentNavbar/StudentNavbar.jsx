import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const StudentNavbar = () => {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user?.data?.User?.userType === "student" && (
        <>
          {user?.data?.CredentailsData?.userType === "institute" && (
            <>
              <div>
                <Link
                  className={
                    router.pathname == "/student/attendance"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/attendance"
                >
                  Attendance
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/fee"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/fee"
                >
                  Fee
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/test"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/test"
                >
                  Test
                </Link>
              </div>
            </>
          )}

          {user?.data?.CredentailsData?.userType === "college" && (
            <>
              <div>
                <Link
                  className={
                    router.pathname == "/student/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/dashboard"
                >
                  Home
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/attendance"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/attendance"
                >
                  Attendance
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/fee"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/fee"
                >
                  Fee
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/transport"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/transport"
                >
                  Transport
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/library"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/library"
                >
                  Library
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/test"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/test"
                >
                  Test
                </Link>
              </div>
            </>
          )}

          {user?.data?.CredentailsData?.userType === "school" && (
            <>
              <div>
                <Link
                  className={
                    router.pathname == "/student/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/dashboard"
                >
                  Home
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/TimeTable"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/TimeTable"
                >
                  Time Table
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/attendance"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/attendance"
                >
                  Attendance
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/fee"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/fee"
                >
                  Fee
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              {user?.data?.User?.Transport === true && (
                <>
                  <div>
                    <Link
                      className={
                        router.pathname == "/student/transport"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/student/transport"
                    >
                      Transport
                    </Link>
                  </div>
                  &nbsp;&nbsp; &nbsp;&nbsp;
                </>
              )}
              {user?.data?.User?.hostal === true && (
                <>
                  <div>
                    <Link
                      className={
                        router.pathname == "/student/hostel"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/student/hostel"
                    >
                      Hostel
                    </Link>
                  </div>
                  &nbsp;&nbsp; &nbsp;&nbsp;
                </>
              )}
              {user?.data?.User?.Library === true && (
                <>
                  <div>
                    <Link
                      className={
                        router.pathname == "/student/library"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/student/library"
                    >
                      Library
                    </Link>
                  </div>
                  &nbsp;&nbsp; &nbsp;&nbsp;
                </>
              )}
              <div>
                <Link
                  className={
                    router.pathname == "/student/test"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/test"
                >
                  Test
                </Link>
              </div>
            </>
          )}
          {user?.data?.User?.typeoforganization === "college" && (
            <>
              <div>
                <Link
                  className={
                    router.pathname == "/student/dashboard"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/dashboard"
                >
                  Home
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/TimeTable"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/TimeTable"
                >
                  Time Table
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/attendance"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/attendance"
                >
                  Attendance
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <div>
                <Link
                  className={
                    router.pathname == "/student/fee"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/fee"
                >
                  Fee
                </Link>
              </div>
              &nbsp;&nbsp; &nbsp;&nbsp;
              {user?.data?.User?.Transport === true && (
                <>
                  <div>
                    <Link
                      className={
                        router.pathname == "/student/transport"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/student/transport"
                    >
                      Transport
                    </Link>
                  </div>
                  &nbsp;&nbsp; &nbsp;&nbsp;
                </>
              )}
              {user?.data?.User?.hostal === true && (
                <>
                  <div>
                    <Link
                      className={
                        router.pathname == "/student/hostel"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/student/hostel"
                    >
                      Hostel
                    </Link>
                  </div>
                  &nbsp;&nbsp; &nbsp;&nbsp;
                </>
              )}
              {user?.data?.User?.Library === true && (
                <>
                  <div>
                    <Link
                      className={
                        router.pathname == "/student/library"
                          ? "link_directActive"
                          : "link_direct"
                      }
                      href="/student/library"
                    >
                      Library
                    </Link>
                  </div>
                  &nbsp;&nbsp; &nbsp;&nbsp;
                </>
              )}
              <div>
                <Link
                  className={
                    router.pathname == "/student/test"
                      ? "link_directActive"
                      : "link_direct"
                  }
                  href="/student/test"
                >
                  Test
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default StudentNavbar;
