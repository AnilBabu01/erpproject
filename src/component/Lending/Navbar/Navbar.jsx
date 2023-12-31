import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import Login from "../../../component/Auth/Login";
import Register from "../../../component/Auth/Register";
import StudentLogin from "@/component/Auth/StudentLogin";
import Slide from "@mui/material/Slide";
import { secondaryColor } from "../../../utils/colorVariables";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { backendUrl } from "../../../config/config";
import CollegeNavbar from "../../Lending/CollegeNavbar/CollegeNavbar";
import SchoolNavbar from "../../Lending/SchoolNavbar/SchoolNavbar";
import AdminNavbar from "../../Lending/AdminNavbar/AdminNavbar";
import CoachingNavbar from "../CoachingNavbar/CoachingNavbar";
import StudentNavbar from "../StudentNavbar/StudentNavbar";
import ParentNavbar from "../ParentNavbar/ParentNavbar";
import EmployeeNavbar from "../EmployeeNavbar/EmployeeNavbar";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "@mui/material/Modal";
import Welcome from "@/component/Auth/Welcome";
import Forgetpassword from "@/component/Auth/Forgetpassword";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  background: "rgba(255, 255, 255, 1)",
  boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.25)",
  borderRadius: "3px",
  // pt: 2,
  // px: 4,
  // pb: 3,
};

function Navbar({ open, setOpen, setLoadingshow }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open1, setOpen1] = useState(false);
  const [welcomeopen, setwelcomeopen] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [navbar, setnavbar] = useState(false);
  const [isMobile, setisMobile] = useState(false);
  const [showmenu1, setshowmenu1] = useState(false);
  const [showmenu2, setshowmenu2] = useState(false);
  const [student, setstudent] = useState(false);
  const [attendance, setattendance] = useState(false);
  const [accounts, setaccounts] = useState(false);
  const [humanresourse, sethumanresourse] = useState(false);
  const [master, setmaster] = useState(false);
  const [reports, setreports] = useState(false);
  const [transport, settransport] = useState(false);
  const [hostel, sethostel] = useState(false);
  const [library, setlibrary] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open4, setOpen4] = useState(false);
  const open2 = Boolean(anchorEl);

  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleWelcomeClose = () => {
    setwelcomeopen(false);
  };

  const [openforget, setopenforget] = useState(false);

  const handleClickOpenforget = () => {
    setopenforget(true);
  };

  const handleWelcomeCloseforget = () => {
    setopenforget(false);
  };

  const logout = () => {
    localStorage.removeItem("erptoken");
    setLoadingshow(true);
    dispatch(loadUser());
    router.push("/");
    if (!localStorage.removeItem("erptoken")) {
      toast.success("You Have Logout Successfully!!", {
        autoClose: 1000,
      });
    }
    // setTimeout(() => {
    //   setLoadingshow(false);
    // }, 10);
  };

  const changebackgrou = () => {
    if (window.scrollY >= 80) {
      setnavbar(true);
    } else {
      setnavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changebackgrou);
  }, []);

  return (
    <>
      {open2 && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open2}
          onClose={handleClose1}
          onClick={handleClose1}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose1}>
            <Avatar
              alt="user"
              src={`${backendUrl}public/upload/${user?.data?.User?.profileurl}`}
            />
            {user?.data?.User?.name}
          </MenuItem>
          <Divider />
          {user?.data?.User?.userType === "institute" && (
            <>
              <MenuItem onClick={() => router.push("/profile")}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
            </>
          )}
          {user?.data?.User?.userType === "school" && (
            <>
              <MenuItem onClick={() => router.push("/profile")}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
            </>
          )}
          {user?.data?.User?.userType === "college" && (
            <>
              <MenuItem onClick={() => router.push("/profile")}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
            </>
          )}

          {user?.data?.User?.userType === "employee" && (
            <>
              <MenuItem onClick={() => router.push("/profile")}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
            </>
          )}

          {user?.data?.User?.userType === "student" && (
            <>
              <MenuItem onClick={() => router.push("/profile")}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
            </>
          )}

          <MenuItem onClick={() => router.push("/changepassword")}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Change Password
          </MenuItem>

          <MenuItem onClick={() => logout()}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}

      {welcomeopen && (
        <>
          <Modal
            open={welcomeopen}
            onClose={handleWelcomeClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style }}>
              <Welcome setOpen={setwelcomeopen} />
            </Box>
          </Modal>
        </>
      )}

      {open && (
        <>
          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style }}>
              <Login
                setOpen={setOpen}
                setOpen1={setOpen1}
                setopenforget={setopenforget}
                setwelcomeopen={setwelcomeopen}
              />
            </Box>
          </Modal>
        </>
      )}

      {openforget && (
        <>
          <Modal
            open={openforget}
            // onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style }}>
              <Forgetpassword
                setOpen={setopenforget}
                setOpen1={setopenforget}
                setwelcomeopen={setwelcomeopen}
              />
            </Box>
          </Modal>
        </>
      )}

      {open1 && (
        <>
          <Modal
            open={open1}
            // onClose={handleCloseregister}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style }}>
              <Register setOpen={setOpen1} setOpen1={setOpen} />
            </Box>
          </Modal>
        </>
      )}

      <nav className={navbar ? "main_div_header_scroll" : "main_div_header"}>
        <i
          className="main_div_is_hai_na"
          onClick={() => setisMobile(!isMobile)}
        >
          {isMobile ? (
            <>
              <CloseIcon style={{ height: "40px" }} className="burger" />
            </>
          ) : (
            <>
              <MenuIcon style={{ height: "40px" }} className="burger" />
            </>
          )}
        </i>

        <Link
          className="logodivlinnk"
          href="/"
          onClick={() => setisMobile(false)}
        >
          <div className="logoimg">
            {isAuthenticated && user ? (
              <>
                {user?.data?.CredentailsData?.logourl ? (
                  <>
                    <img
                      src={`${backendUrl}public/upload/${user?.data?.CredentailsData?.logourl}`}
                      alt="Logo"
                    />
                  </>
                ) : (
                  <>
                    {navbar ? (
                      <>
                        <img src="/images/logoblue1.png" alt="Logo" />
                      </>
                    ) : (
                      <>
                        <img src="/images/logowhite.png" alt="Logo" />
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {navbar ? (
                  <>
                    <img src="/images/logoblue1.png" alt="Logo" />
                  </>
                ) : (
                  <>
                    <img src="/images/logowhite.png" alt="Logo" />
                  </>
                )}
              </>
            )}
          </div>
        </Link>

        <div className={isMobile ? "main_div_header10" : "main_div_header10"}>
          {isAuthenticated && user ? (
            <>
              <AdminNavbar />
              <CollegeNavbar />
              <SchoolNavbar />
              <CoachingNavbar />
              <StudentNavbar />
              <ParentNavbar />
              <EmployeeNavbar />
            </>
          ) : (
            <>
              <div>
                <Link
                  className={
                    router.pathname == "/" ? "link_directActive" : "link_direct"
                  }
                  href="/"
                >
                  Home
                </Link>
              </div>

              <div className="dropdown1">
                <button className="dropbtn">
                  Service <KeyboardArrowDownIcon />
                </button>
                <div className="dropdown-content">
                  <Link href="/">Android Development</Link>
                  <Link href="/">IOS Development</Link>
                  <Link href="/">Web Development</Link>
                </div>
              </div>

              <Link
                className={
                  router.pathname == "/aa" ? "link_directActive" : "link_direct"
                }
                href="/"
              >
                Learning
              </Link>
              <Link
                onClick={() => {
                  setisMobile(!isMobile);
                  setshowmenu1(!showmenu1);
                }}
                href="/lzogin"
                className={
                  router.pathname == "/ww" ? "link_directActive" : "link_direct"
                }
              >
                &nbsp;&nbsp; &nbsp;&nbsp; Help Center
              </Link>
            </>
          )}
        </div>

        {isAuthenticated ? (
          <div onClick={handleClick1}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {user?.data?.User?.profileurl ? (
                <>
                  <Avatar
                    alt="user"
                    src={`${backendUrl}public/upload/${user?.data?.User?.profileurl}`}
                    sx={{
                      width: 35,
                      height: 35,
                    }}
                  />
                </>
              ) : (
                <>
                  <Avatar
                    alt="user"
                    src={`${backendUrl}public/upload/${user?.data?.User?.profileurl}`}
                    sx={{
                      width: 35,
                      height: 35,
                    }}
                  />
                </>
              )}

              <IconButton size="small" aria-label="more">
                <ArrowDropDownOutlinedIcon
                  size="large"
                  sx={{ color: secondaryColor }}
                />
              </IconButton>
            </Box>
          </div>
        ) : (
          <>
            <button
              onClick={() => handleClickOpen()}
              className="loginbtnHeader"
            >
              Login
            </button>
          </>
        )}
      </nav>
      <div className={isMobile ? "open1 " : "menu-div"}>
        <div className="closeinmobile">
          <i
            className="main_div_is_hai_na"
            onClick={() => setisMobile(!isMobile)}
          >
            {isMobile ? (
              <>
                <CloseIcon style={{ height: "40px" }} className="burger" />
              </>
            ) : (
              <>
                <MenuIcon style={{ height: "40px" }} className="burger" />
              </>
            )}
          </i>
        </div>

        {isAuthenticated && user ? (
          <>
            {user?.data?.User?.userType === "admin" && (
              <>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <Link
                    className={
                      router.pathname == "/mainadmin/dashbord"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/mainadmin/dashboard"
                  >
                    Dashboard
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <Link
                    className={
                      router.pathname == "/"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/"
                  >
                    Clients
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <Link
                    className={
                      router.pathname == "/"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/"
                  >
                    Active Plans
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <Link
                    className={
                      router.pathname == "/"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/"
                  >
                    Exhausted Plans
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <Link
                    className={
                      router.pathname == "/"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/"
                  >
                    Guest Clients
                  </Link>
                </MenuItem>
              </>
            )}

            {user?.data?.User?.userType === "parent" && (
              <>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <Link
                    className={
                      router.pathname == "/mainadmin/dashbord"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/mainadmin/dashboard"
                  >
                    Dashboard
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <Link
                    className={
                      router.pathname == "/"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/"
                  >
                    Clients
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <Link
                    className={
                      router.pathname == "/"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/"
                  >
                    Active Plans
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <Link
                    className={
                      router.pathname == "/"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/"
                  >
                    Exhausted Plans
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <Link
                    className={
                      router.pathname == "/"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/"
                  >
                    Guest Clients
                  </Link>
                </MenuItem>
              </>
            )}

            {user?.data?.User?.userType === "student" && (
              <>
                {user?.data?.CredentailsData?.userType === "school" && (
                  <>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/dashboard"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/dashboard"
                      >
                        Home
                      </Link>
                    </MenuItem>

                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/TimeTable"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/TimeTable"
                      >
                        Time Table
                      </Link>
                    </MenuItem>

                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/attendance"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/attendance"
                      >
                        Attendance
                      </Link>
                    </MenuItem>

                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/fee"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/fee"
                      >
                        Fee
                      </Link>
                    </MenuItem>
                    {user?.data?.User?.Transport === true && (
                      <>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={() => setisMobile(!isMobile)}>
                          <Link
                            className={
                              router.pathname == "/student/transport"
                                ? "link_directActive"
                                : "link_direct10"
                            }
                            href="/student/transport"
                          >
                            Transport
                          </Link>
                        </MenuItem>
                      </>
                    )}

                    {user?.data?.User?.hostal === true && (
                      <>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={() => setisMobile(!isMobile)}>
                          <Link
                            className={
                              router.pathname == "/student/hostel"
                                ? "link_directActive"
                                : "link_direct10"
                            }
                            href="/student/hostel"
                          >
                            Hostel
                          </Link>
                        </MenuItem>
                      </>
                    )}

                    {user?.data?.User?.Library === true && (
                      <>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={() => setisMobile(!isMobile)}>
                          <Link
                            className={
                              router.pathname == "/student/library"
                                ? "link_directActive"
                                : "link_direct10"
                            }
                            href="/student/library"
                          >
                            Library
                          </Link>
                        </MenuItem>
                      </>
                    )}

                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/test"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/test"
                      >
                        Test
                      </Link>
                    </MenuItem>
                  </>
                )}

                {user?.data?.CredentailsData?.userType === "college" && (
                  <>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/dashboard"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/dashboard"
                      >
                        Home
                      </Link>
                    </MenuItem>

                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/TimeTable"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/TimeTable"
                      >
                        Time Table
                      </Link>
                    </MenuItem>

                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/attendance"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/attendance"
                      >
                        Attendance
                      </Link>
                    </MenuItem>

                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/fee"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/fee"
                      >
                        Fee
                      </Link>
                    </MenuItem>
                    {user?.data?.User?.Transport === true && (
                      <>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={() => setisMobile(!isMobile)}>
                          <Link
                            className={
                              router.pathname == "/student/transport"
                                ? "link_directActive"
                                : "link_direct10"
                            }
                            href="/student/transport"
                          >
                            Transport
                          </Link>
                        </MenuItem>
                      </>
                    )}

                    {user?.data?.User?.hostal === true && (
                      <>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={() => setisMobile(!isMobile)}>
                          <Link
                            className={
                              router.pathname == "/student/hostel"
                                ? "link_directActive"
                                : "link_direct10"
                            }
                            href="/student/hostel"
                          >
                            Hostel
                          </Link>
                        </MenuItem>
                      </>
                    )}

                    {user?.data?.User?.Library === true && (
                      <>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={() => setisMobile(!isMobile)}>
                          <Link
                            className={
                              router.pathname == "/student/library"
                                ? "link_directActive"
                                : "link_direct10"
                            }
                            href="/student/library"
                          >
                            Library
                          </Link>
                        </MenuItem>
                      </>
                    )}

                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/test"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/test"
                      >
                        Test
                      </Link>
                    </MenuItem>
                  </>
                )}

                {user?.data?.CredentailsData?.userType === "institute" && (
                  <>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/attendance"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/attendance"
                      >
                        Attendance
                      </Link>
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/fee"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/fee"
                      >
                        Fee
                      </Link>
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={() => setisMobile(!isMobile)}>
                      <Link
                        className={
                          router.pathname == "/student/test"
                            ? "link_directActive"
                            : "link_direct10"
                        }
                        href="/student/test"
                      >
                        Test
                      </Link>
                    </MenuItem>
                  </>
                )}
              </>
            )}

            {user?.data?.User?.userType === "institute" && (
              <>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => setisMobile(!isMobile)}>
                  <Link
                    className={
                      router.pathname == "/mainadmin/dashbord"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/mainadmin/dashboard"
                  >
                    Dashboard
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setshowmenu2(!showmenu2)}
                    className="add_icons_div"
                  >
                    <p> Front Office</p>{" "}
                    {showmenu2 ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <motion.div
                  animate={{ x: 0 }}
                  className={showmenu2 ? "menu_show" : "menu_hide"}
                >
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/frontoffice/enquiry"
                    >
                      Admission Enquiry
                    </Link>
                  </MenuItem>
                </motion.div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setstudent(!student)}
                    className="add_icons_div"
                  >
                    <p> Student</p>
                    {student ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={student ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/admission"
                    >
                      Admission
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/addstudent"
                    >
                      Add Student
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/studenthistory"
                    >
                      Student History
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/studentlogincreadential"
                    >
                      Student Login Creadential
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/disabledstudent"
                    >
                      Disabled Students
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/parentlogincreadential"
                    >
                      Parent Login Creadential
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/sendmessage"
                    >
                      Send Message
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/sendemail"
                    >
                      Send Email
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/studentcertificate"
                    >
                      Student Certificate
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/studentidcard"
                    >
                      Student Id Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/assignment"
                    >
                      Assign Test
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/receivedassignment"
                    >
                      Received Test
                    </Link>
                  </MenuItem>
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setattendance(!attendance)}
                    className="add_icons_div"
                  >
                    <p>Attendance</p>
                    {attendance ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={attendance ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/attendance"
                    >
                      Take Attendance
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/holiday"
                    >
                      Add Holiday
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/particularattendance"
                    >
                      Particular Student Attendance
                    </Link>
                  </MenuItem>
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setaccounts(!accounts)}
                    className="add_icons_div"
                  >
                    <p>Accounts</p>
                    {accounts ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={accounts ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/accounts/collectfee"
                    >
                      Collect Fees
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/accounts/printreceipt"
                    >
                      Print Fee Receipt
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/accounts/searchfee"
                    >
                      Search Fees Payment
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => sethumanresourse(!humanresourse)}
                    className="add_icons_div"
                  >
                    <p>HR</p>
                    {humanresourse ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={humanresourse ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/Staff"
                    >
                      Add Staff
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/Employeeidcard"
                    >
                      Employee Id Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/Disabledstaff"
                    >
                      Disabled Employee
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/Attendance"
                    >
                      Staff Attendance
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/Addemployeeholiday"
                    >
                      Add Holiday
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/Particularemployeeattendance"
                    >
                      Particular Employee Attendance
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/Payroll"
                    >
                      Add Payroll
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/Payrollreport"
                    >
                      Payroll Report
                    </Link>
                  </MenuItem>
                </div>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setmaster(!master)}
                    className="add_icons_div"
                  >
                    <p>Masters</p>
                    {master ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={master ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/batchtime"
                    >
                      Add Batch Time
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/course"
                    >
                      Course
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/masterstudentcategory"
                    >
                      Student Category
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/receiptprefix"
                    >
                      Receipt Prefix
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/masterfee"
                    >
                      Fees Structure
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/department"
                    >
                      Department
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/masteremployee"
                    >
                      Designation
                    </Link>
                  </MenuItem>
                </div>
                <Divider sx={{ my: 0.5 }} />

                <MenuItem>
                  <div
                    onClick={() => setreports(!reports)}
                    className="add_icons_div"
                  >
                    <p>Reports</p>
                    {reports ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={reports ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/StudentReport"
                    >
                      Student Report
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/StudentAttendanceReport"
                    >
                      Student Attendance Report
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/StudentTestReport"
                    >
                      Student Test Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/feecollection"
                    >
                      Student All Paid Fee Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/pendingfee"
                    >
                      Student All Pending Fee Report
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentidcard"
                    >
                      Student ID Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentlogindetails"
                    >
                      Student Login Details
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/faultyidcard"
                    >
                      Faculty ID Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/EmployeeReport"
                    >
                      Employee Report
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/EmployeeSalaryPaid"
                    >
                      Employee Salary Paid Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/EmployeeSalarySlip"
                    >
                      Employee Salary Slip Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/EmployeeAttendance"
                    >
                      Employee Attendance Report
                    </Link>
                  </MenuItem>
                </div>
                <Divider sx={{ my: 0.5 }} />
              </>
            )}

            {user?.data?.User?.userType === "college" && (
              <>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <Link
                    className={
                      router.pathname == "/mainadmin/dashbord"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/mainadmin/dashboard"
                  >
                    Dashboard
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setshowmenu2(!showmenu2)}
                    className="add_icons_div"
                  >
                    <p> Front Office</p>{" "}
                    {showmenu2 ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={showmenu2 ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/frontoffice/enquiry"
                    >
                      Admission Enquiry
                    </Link>
                  </MenuItem>
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setstudent(!student)}
                    className="add_icons_div"
                  >
                    <p> Student</p>
                    {student ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={student ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/admission"
                    >
                      Admission
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/addstudent"
                    >
                      Add Student
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/studenthistory"
                    >
                      Student History
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/studentlogincreadential"
                    >
                      Student Login Creadential
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/disabledstudent"
                    >
                      Disabled Students
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/parentlogincreadential"
                    >
                      Parent Login Creadential
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/sendmessage"
                    >
                      Send Message
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/sendemail"
                    >
                      Send Email
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/studentcertificate"
                    >
                      Student Certificate
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/studentidcard"
                    >
                      Student Id Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/assignment"
                    >
                      Assign Test
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/receivedassignment"
                    >
                      Received Test
                    </Link>
                  </MenuItem>
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setattendance(!attendance)}
                    className="add_icons_div"
                  >
                    <p>Attendance</p>
                    {attendance ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={attendance ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/attendance"
                    >
                      Take Attendance
                    </Link>
                  </MenuItem>
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setaccounts(!accounts)}
                    className="add_icons_div"
                  >
                    <p>Accounts</p>
                    {accounts ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={accounts ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/accounts/collectfee"
                    >
                      Collect Fees
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/accounts/searchfee"
                    >
                      Search Fees Payment
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/accounts/balancefee"
                    >
                      Balance Fees Report
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/accounts/feediscount"
                    >
                      Fee Discount
                    </Link>
                  </MenuItem>
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => sethumanresourse(!humanresourse)}
                    className="add_icons_div"
                  >
                    <p>HR</p>
                    {humanresourse ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={humanresourse ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/staff"
                    >
                      Add Staff
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/attendance"
                    >
                      Staff Attendance
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/payroll"
                    >
                      Payroll Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/department"
                    >
                      Department
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/disabledstaff"
                    >
                      Disabled Staff
                    </Link>
                  </MenuItem>
                </div>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setmaster(!master)}
                    className="add_icons_div"
                  >
                    <p>Masters</p>
                    {master ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={master ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/batchtime"
                    >
                      Add Batch Time
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/course"
                    >
                      Course
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/masterstudentcategory"
                    >
                      Student Category
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/masterfee"
                    >
                      Fees Structure
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/department"
                    >
                      Department
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/masteremployee"
                    >
                      Designation
                    </Link>
                  </MenuItem>
                </div>
                <Divider sx={{ my: 0.5 }} />

                <MenuItem>
                  <div
                    onClick={() => setreports(!reports)}
                    className="add_icons_div"
                  >
                    <p>Reports</p>
                    {reports ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={reports ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentattendancereport"
                    >
                      Attendance Report
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentidcard"
                    >
                      Student ID Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentlogindetails"
                    >
                      Student Login Details
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/faultyidcard"
                    >
                      Faculty ID Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentperformance"
                    >
                      Student Performance Report
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/feecollection"
                    >
                      Fees Collection Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/pendingfee"
                    >
                      Fees Pending Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/feestudent"
                    >
                      Fees Pending Studentwise report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/leavereport"
                    >
                      Employee Leave Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/employeelogdetails"
                    >
                      Employee Login Details
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/salaryslip"
                    >
                      Employee Salary Slip
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/salaryreport"
                    >
                      Employee Salary Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/employeeattendancereport"
                    >
                      Employee Attendance Report
                    </Link>
                  </MenuItem>
                </div>
                <Divider sx={{ my: 0.5 }} />
              </>
            )}

            {user?.data?.User?.userType === "school" && (
              <>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => setisMobile(!isMobile)}>
                  <Link
                    className={
                      router.pathname == "/school/dashboard"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/school/dashboard"
                  >
                    Dashboard
                  </Link>
                </MenuItem>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setshowmenu2(!showmenu2)}
                    className="add_icons_div"
                  >
                    <p> Front Office</p>{" "}
                    {showmenu2 ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>

                {showmenu2 && (
                  <div>
                    <div className={showmenu2 ? "menu_show" : "menu_hide"}>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/frontoffice/enquiry"
                        >
                          Admission Enquiry
                        </Link>
                      </MenuItem>
                    </div>
                  </div>
                )}

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setstudent(!student)}
                    className="add_icons_div"
                  >
                    <p> Student</p>
                    {student ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={student ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Admission"
                    >
                      Admission
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/AddStudent"
                    >
                      Add Student
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Studenthistory"
                    >
                      Student History
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Studentlogincreadential"
                    >
                      Student Login Creadential
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Changesession"
                    >
                      Change Session
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/OtherFee"
                    >
                      Add Other Fee
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Timetable"
                    >
                      Add Time Table
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Parentlogincreadential"
                    >
                      Parent Login Creadential
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Sendmessage"
                    >
                      Send Message
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Sendemail"
                    >
                      Send Email
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Studentcertificate"
                    >
                      Student Certificate
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Studentidcard"
                    >
                      Student Id Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Assignment"
                    >
                      Assign Test
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Receivedassignment"
                    >
                      Received Test
                    </Link>
                  </MenuItem>
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setattendance(!attendance)}
                    className="add_icons_div"
                  >
                    <p>Attendance</p>
                    {attendance ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={attendance ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Attendance"
                    >
                      Student Attendance
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Holiday"
                    >
                      Add Holiday
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/student/Particularattendance"
                    >
                      Particular Student Attendance
                    </Link>
                  </MenuItem>
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setaccounts(!accounts)}
                    className="add_icons_div"
                  >
                    <p>Accounts</p>
                    {accounts ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={accounts ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/accounts/Collectfee"
                    >
                      Collect Fees
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/accounts/Printreceipt"
                    >
                      Print Fee Receipt
                    </Link>
                  </MenuItem>
                </div>

                {user?.data?.CredentailsData?.Transport === true && (
                  <>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem>
                      <div
                        onClick={() => settransport(!transport)}
                        className="add_icons_div"
                      >
                        <p>Transport</p>
                        {transport ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                      </div>
                    </MenuItem>
                    <div className={transport ? "menu_show" : "menu_hide"}>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/transport/vehicletype"
                        >
                          Add Vehicle Type
                        </Link>
                      </MenuItem>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/transport/Vehicledetails"
                        >
                          Add Bus
                        </Link>
                      </MenuItem>

                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/transport/Addroutes"
                        >
                          Add Routes
                        </Link>
                      </MenuItem>

                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/transport/Addstudent"
                        >
                          Add Student To Transport
                        </Link>
                      </MenuItem>

                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/transport/Assignbus"
                        >
                          Assign Bus To Student
                        </Link>
                      </MenuItem>
                    </div>
                  </>
                )}

                {user?.data?.CredentailsData?.Library === true && (
                  <>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem>
                      <div
                        onClick={() => setlibrary(!library)}
                        className="add_icons_div"
                      >
                        <p>Library</p>
                        {library ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                      </div>
                    </MenuItem>
                    <div className={library ? "menu_show" : "menu_hide"}>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/library/Addstudent"
                        >
                          Add Student In Library
                        </Link>
                      </MenuItem>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/library/Addbook"
                        >
                          Add Book
                        </Link>
                      </MenuItem>

                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/library/Issuereturn"
                        >
                          Issue Return
                        </Link>
                      </MenuItem>
                    </div>
                  </>
                )}

                {user?.data?.CredentailsData?.hostel === true && (
                  <>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem>
                      <div
                        onClick={() => sethostel(!hostel)}
                        className="add_icons_div"
                      >
                        <p>Hostel</p>
                        {hostel ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                      </div>
                    </MenuItem>
                    <div className={hostel ? "menu_show" : "menu_hide"}>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/hostel/Category"
                        >
                          Add Category
                        </Link>
                      </MenuItem>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/hostel/Facility"
                        >
                          Add Facility
                        </Link>
                      </MenuItem>

                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/hostel/Addhostel"
                        >
                          Add Hostel
                        </Link>
                      </MenuItem>

                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/hostel/Addroom"
                        >
                          Add Room
                        </Link>
                      </MenuItem>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/hostel/Assignhostel"
                        >
                          Give Room To Student
                        </Link>
                      </MenuItem>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem>
                        <Link
                          onClick={() => setisMobile(!isMobile)}
                          className={({ isActive }) =>
                            isActive ? "link_directActive" : "link_directs"
                          }
                          href="/school/hostel/Addstudent"
                        >
                          Add Student In Room
                        </Link>
                      </MenuItem>
                    </div>
                  </>
                )}

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => sethumanresourse(!humanresourse)}
                    className="add_icons_div"
                  >
                    <p>HR</p>
                    {humanresourse ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={humanresourse ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/employee/Staff"
                    >
                      Add Staff
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/employee/Employeeidcard"
                    >
                      Employee Id Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/employee/Disabledstaff"
                    >
                      Disabled Employee
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/employee/Attendance"
                    >
                      Employee Attendance
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/employee/Addemployeeholiday"
                    >
                      Add Holiday
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/employee/Particularemployeeattendance"
                    >
                      Particular Employee Attendance
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/employee/Payroll"
                    >
                      Add Payroll
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/employee/Payrollreport"
                    >
                      Payroll Report
                    </Link>
                  </MenuItem>
                </div>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setmaster(!master)}
                    className="add_icons_div"
                  >
                    <p>Masters</p>
                    {master ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={master ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/masters/AddSession"
                    >
                      Seesion
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/masters/AddSection"
                    >
                      Section
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/masters/class"
                    >
                      Class
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/masters/masterstudentcategory"
                    >
                      Student Category
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/masters/receiptprefix"
                    >
                      Receipt Prefix
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/masters/masterfee"
                    >
                      Fees Structure
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/masters/department"
                    >
                      Department
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/masters/masteremployee"
                    >
                      Designation
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/masters/FooterDetails"
                    >
                      Add Footer Details
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/masters/Notes"
                    >
                      Add Notic
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/school/masters/Slider"
                    >
                      Add Slider
                    </Link>
                  </MenuItem>
                </div>
                <Divider sx={{ my: 0.5 }} />

                <MenuItem>
                  <div
                    onClick={() => setreports(!reports)}
                    className="add_icons_div"
                  >
                    <p>Reports</p>
                    {reports ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={reports ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentattendancereport"
                    >
                      Attendance Report
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentidcard"
                    >
                      Student ID Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentlogindetails"
                    >
                      Student Login Details
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/faultyidcard"
                    >
                      Faculty ID Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentperformance"
                    >
                      Student Performance Report
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/feecollection"
                    >
                      Fees Collection Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/pendingfee"
                    >
                      Fees Pending Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/feestudent"
                    >
                      Fees Pending Studentwise report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/leavereport"
                    >
                      Employee Leave Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/employeelogdetails"
                    >
                      Employee Login Details
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/salaryslip"
                    >
                      Employee Salary Slip
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/salaryreport"
                    >
                      Employee Salary Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/employeeattendancereport"
                    >
                      Employee Attendance Report
                    </Link>
                  </MenuItem>
                </div>
                <Divider sx={{ my: 0.5 }} />
              </>
            )}

            {user?.data?.User?.organizationtype === "institute" && (
              <>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <Link
                    className={
                      router.pathname == "/coaching/dashboard"
                        ? "link_directActive"
                        : "link_direct10"
                    }
                    href="/coaching/dashboard"
                  >
                    Dashboard
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                {/* <MenuItem>
                  <div
                    onClick={() => setshowmenu2(!showmenu2)}
                    className="add_icons_div"
                  >
                    <p> Front Office</p>
                    {showmenu2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </div>
                </MenuItem> */}
                <div className={showmenu2 ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/frontoffice/enquiry"
                    >
                      Admission Enquiry
                    </Link>
                  </MenuItem>
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setstudent(!student)}
                    className="add_icons_div"
                  >
                    <p> Student</p>
                    {student ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={student ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/admission"
                    >
                      Admission
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/addstudent"
                    >
                      Add Student
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/studenthistory"
                    >
                      Student History
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/studentlogincreadential"
                    >
                      Student Login Creadential
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/disabledstudent"
                    >
                      Disabled Students
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/parentlogincreadential"
                    >
                      Parent Login Creadential
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/sendmessage"
                    >
                      Send Message
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/sendemail"
                    >
                      Send Email
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/studentcertificate"
                    >
                      Student Certificate
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/studentidcard"
                    >
                      Student Id Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/assignment"
                    >
                      Assign Test
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/receivedassignment"
                    >
                      Received Test
                    </Link>
                  </MenuItem>
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setattendance(!attendance)}
                    className="add_icons_div"
                  >
                    <p>Attendance</p>
                    {attendance ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={attendance ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/student/attendance"
                    >
                      Take Attendance
                    </Link>
                  </MenuItem>
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setaccounts(!accounts)}
                    className="add_icons_div"
                  >
                    <p>Accounts</p>
                    {accounts ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={accounts ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/accounts/collectfee"
                    >
                      Collect Fees
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/accounts/searchfee"
                    >
                      Search Fees Payment
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/accounts/balancefee"
                    >
                      Balance Fees Report
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/accounts/feediscount"
                    >
                      Fee Discount
                    </Link>
                  </MenuItem>
                </div>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => sethumanresourse(!humanresourse)}
                    className="add_icons_div"
                  >
                    <p>HR</p>
                    {humanresourse ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={humanresourse ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/staff"
                    >
                      Add Staff
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/attendance"
                    >
                      Staff Attendance
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/payroll"
                    >
                      Payroll Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/department"
                    >
                      Department
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/employee/disabledstaff"
                    >
                      Disabled Staff
                    </Link>
                  </MenuItem>
                </div>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem>
                  <div
                    onClick={() => setmaster(!master)}
                    className="add_icons_div"
                  >
                    <p>Masters</p>
                    {master ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={master ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/batchtime"
                    >
                      Add Batch Time
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/course"
                    >
                      Course
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/masterstudentcategory"
                    >
                      Student Category
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/masterfee"
                    >
                      Fees Structure
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/department"
                    >
                      Department
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/masters/masteremployee"
                    >
                      Designation
                    </Link>
                  </MenuItem>
                </div>
                <Divider sx={{ my: 0.5 }} />

                <MenuItem>
                  <div
                    onClick={() => setreports(!reports)}
                    className="add_icons_div"
                  >
                    <p>Reports</p>
                    {reports ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </div>
                </MenuItem>
                <div className={reports ? "menu_show" : "menu_hide"}>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentattendancereport"
                    >
                      Attendance Report
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentidcard"
                    >
                      Student ID Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentlogindetails"
                    >
                      Student Login Details
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/faultyidcard"
                    >
                      Faculty ID Card
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/studentperformance"
                    >
                      Student Performance Report
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/feecollection"
                    >
                      Fees Collection Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/pendingfee"
                    >
                      Fees Pending Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/feestudent"
                    >
                      Fees Pending Studentwise report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/leavereport"
                    >
                      Employee Leave Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/employeelogdetails"
                    >
                      Employee Login Details
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/salaryslip"
                    >
                      Employee Salary Slip
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/salaryreport"
                    >
                      Employee Salary Report
                    </Link>
                  </MenuItem>

                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem>
                    <Link
                      onClick={() => setisMobile(!isMobile)}
                      className={({ isActive }) =>
                        isActive ? "link_directActive" : "link_directs"
                      }
                      href="/coaching/report/employeeattendancereport"
                    >
                      Employee Attendance Report
                    </Link>
                  </MenuItem>
                </div>
                <Divider sx={{ my: 0.5 }} />
              </>
            )}
          </>
        ) : (
          <>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem>
              <Link
                className={
                  router.pathname == "/" ? "link_directActive" : "link_direct10"
                }
                href="/"
              >
                Home
              </Link>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem>
              <div
                onClick={() => setshowmenu2(!showmenu2)}
                className="add_icons_div"
              >
                <p>Services</p>{" "}
                {showmenu2 ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </div>
            </MenuItem>

            <div className={showmenu2 ? "menu_show" : "menu_hide"}>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem>
                <Link
                  onClick={() => setisMobile(!isMobile)}
                  className={({ isActive }) =>
                    isActive ? "link_directActive" : "link_directs"
                  }
                  href="/"
                >
                  Android Development
                </Link>
              </MenuItem>

              <Divider sx={{ my: 0.5 }} />
              <MenuItem>
                <Link
                  className={({ isActive }) =>
                    isActive ? "link_directActive" : "link_directs"
                  }
                  href="/sds"
                >
                  Web Development
                </Link>
              </MenuItem>
            </div>

            <Divider sx={{ my: 0.5 }} />
            <MenuItem>
              <div
                onClick={() => setshowmenu2(!showmenu2)}
                className="add_icons_div"
              >
                <Link
                  className={
                    router.pathname == "/dd"
                      ? "link_directActive"
                      : "link_direct10"
                  }
                  href="/ss"
                >
                  Learning
                </Link>
              </div>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem>
              <div
                onClick={() => setshowmenu2(!showmenu2)}
                className="add_icons_div"
              >
                <Link
                  className={
                    router.pathname == "/dd"
                      ? "link_directActive"
                      : "link_direct10"
                  }
                  href="/ss"
                >
                  Help Center
                </Link>
              </div>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
