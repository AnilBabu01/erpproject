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

function Navbar({ open, setOpen }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open1, setOpen1] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [navbar, setnavbar] = useState(false);
  const [isMobile, setisMobile] = useState(false);
  const [showmenu1, setshowmenu1] = useState(false);
  const [showmenu2, setshowmenu2] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open4, setOpen4] = useState(false);
  const [close, setclose] = useState(true);
  const open2 = Boolean(anchorEl);
  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // dispatch(loadUser());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  const handleCloseregister = () => {
    setOpen1(false);
  };

  const handlestudentCloseregister = () => {
    setOpen3(false);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };
  const logout = () => {
    localStorage.removeItem("erptoken");

    dispatch(loadUser());
    router.push("/");
    if (!localStorage.removeItem("erptoken")) {
      toast.success("You Have Logout Successfully!!", {
        autoClose: 1000,
      });
    }
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
              src={`${backendUrl}public/upload/${user?.data[0]?.profileurl}`}
            />
            {user?.data[0]?.name}
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => router.push("/profile")}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Update Your Profile
          </MenuItem>
          <MenuItem>
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
      {open && (
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
              sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
               
                  maxWidth: '100%',
                },
              },
            }}
          >
            <Login setOpen={setOpen} setOpen1={setOpen1} />
          </Dialog>
        </div>
      )}

      {open1 && (
        <div>
          <Dialog
            open={open1}
            TransitionComponent={Transition}
            onClose={handleCloseregister}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "60rem",
                },
              },
            }}
          >
            <Register setOpen={setOpen1} setOpen1={setOpen} />
          </Dialog>
        </div>
      )}

      {open3 && (
        <div>
          <Dialog
            open={open3}
            TransitionComponent={Transition}
            onClose={handlestudentCloseregister}
            aria-describedby="alert-dialog-slide-description"
          >
            <StudentLogin setOpen={setOpen3} />
          </Dialog>
        </div>
      )}

      {open4 && (
        <div>
          <Dialog
            open={open4}
            TransitionComponent={Transition}
            onClose={handleClose4}
            aria-describedby="alert-dialog-slide-description"
          >
            <StudentLogin setOpen={setOpen4} />
          </Dialog>
        </div>
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
                {user?.data[0]?.logourl ? (
                  <>
                    <img
                      src={`${backendUrl}public/upload/${user?.data[0]?.logourl}`}
                      alt="Logo"
                    />
                  </>
                ) : (
                  "TechnoErp"
                )}
              </>
            ) : (
              <>TechnoErp</>
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
              {user?.data[0]?.profileurl ? (
                <>
                  <Avatar
                    alt="user"
                    src={`${backendUrl}public/upload/${user?.data[0]?.profileurl}`}
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
                    // src={`${backendUrl}${user && user?.data[0]?.profileurl}`}
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
            {user?.data[0]?.userType === "admin" && (
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
                <p>Services</p> {showmenu2 ? <RemoveIcon /> : <AddIcon />}
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
                  onClick={() => setisMobile(!isMobile)}
                  className={({ isActive }) =>
                    isActive ? "link_directActive" : "link_directs"
                  }
                  href="/"
                >
                  IOS Development
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