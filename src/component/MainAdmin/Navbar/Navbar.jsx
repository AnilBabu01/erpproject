import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownOutlinedIcon  from "@mui/icons-material/ArrowDropDownOutlinedIcon";
import IconButton from "@mui/icons-material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Divider from "@mui/material/Divider";
import Login from "../../../component/Auth/Login";
import Register from "../../../component/Auth/Register";
import Slide from "@mui/material/Slide";
import { secondaryColor } from "../../../utils/colorVariables";

function Navbar({ open, setOpen }) {
  const router = useRouter();
  const [open1, setOpen1] = useState(false);
  const [navbar, setnavbar] = useState(false);
  const [isMobile, setisMobile] = useState(false);
  const [showmenu1, setshowmenu1] = useState(false);
  const [showmenu2, setshowmenu2] = useState(false);

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

  const logout = () => {
    handleClose();
    sessionShrefrage.removeItem("hrefken");
    sessionShrefrage.removeItem("userrole");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const [value, setValue] = useState("");

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
      {open && (
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
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
            <Register setOpen={setOpen1} />
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
        <Link href="/" onClick={() => setisMobile(false)}>
          <div className="logoimg">
            {/* <img src="/codeloper1.png" alt="Logo" /> */}
            TechnoErp
          </div>
        </Link>
        <div className={isMobile ? "main_div_header10" : "main_div_header10"}>
          <div>
            <Link
              className={
                router.pathname == "/" ? "link_directActive" : "link_direct"
              }
              href="/mainadmin/dashbord"
            >
              Dashboard
            </Link>
          </div>

          <div className="dropdown">
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
        </div>

        {value ? (
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                alt="user"
                //   src={`${backendUrl}uploads/images/${user?.profile_image}`}
                sx={{
                  width: 35,
                  height: 35,
                }}
              />

              <IconButton
                onClick={handleClick}
                size="small"
                aria-label="more"
              >
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
                router.pathname == "/dd" ? "link_directActive" : "link_direct10"
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
                router.pathname == "/dd" ? "link_directActive" : "link_direct10"
              }
              href="/ss"
            >
              Help Center
            </Link>
          </div>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
      </div>
    </>
  );
}

export default Navbar;
