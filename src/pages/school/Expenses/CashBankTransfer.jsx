import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcategory } from "../../../redux/actions/commanAction";
import {
  GetRoute,
  GetVehicleType,
  GetVehiclelist,
} from "../../../redux/actions/transportActions";
import {
  GetExpensesType,
  GetTransferAmmount,
} from "../../../redux/actions/expensesActions";
import { GetSession } from "../../../redux/actions/commanAction";
import styles from "../employee/employee.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import CashTransfer from "@/component/Institute/expenses/CashTransfer";
import UpdateCashTransfer from "@/component/Institute/expenses/UpdateCashTransfer";
import LoadingSpinner from "@/component/loader/LoadingSpinner";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import moment from "moment";
function CashBankTransfer() {
  const dispatch = useDispatch();
  const [PayOption, setPayOption] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const [updatedata, setupdatedata] = useState("");
  const [BusNumber, setBusNumber] = useState("");
  const [deleteid, setdeleteid] = useState("");
  const [isdata, setisData] = useState([]);
  const [userdata, setuserdata] = useState("");
  const [Expensestype, setExpensestype] = useState("");
  const [expenseslist, setexpenseslist] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [sessionname, setsessionname] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { Sessions } = useSelector((state) => state.GetSession);
  const { transferamount, loading } = useSelector(
    (state) => state.GetAmountTransfer
  );
  const { expensestype } = useSelector((state) => state.GetExpensesType);
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log("data is ",transferamount)
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });

  const handleCloseregister = () => {
    setOpen(false);
  };

  const ClickOpenupdate = (data) => {
    setOpenupdate(true);
    setupdatedata(data);
  };

  const handleCloseupadte = () => {
    setOpenupdate(false);
  };

  const ClickOpendelete = (id) => {
    setOpenalert(true);
    setdeleteid(id);
  };

  
  const handleClosedelete = () => {
    setOpenalert(false);
  };

  const handledelete = () => {
    serverInstance("expenses/amounttransfer", "delete", {
      id: deleteid,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
        dispatch(GetTransferAmmount());
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setOpenalert(false);
      }
    });
  };
  const filter = () => {
    dispatch(GetTransferAmmount(fromdate, todate, PayOption, sessionname));
  };

  const reset = () => {
    setPayOption("");
    setfromdate("");
    settodate("");
    setExpensestype("");
    let date = new Date();
    let fullyear = date.getFullYear();
    let lastyear = date.getFullYear() - 1;
    setsessionname(`${lastyear}-${fullyear}`);
    dispatch(GetTransferAmmount());
  };

  useEffect(() => {
    if (transferamount) {
      setisData(transferamount);
    }
    if (user) {
      setuserdata(user);
    }
    if (expensestype) {
      setexpenseslist(expensestype);
    }
    if (Sessions) {
      setsessionList(Sessions);
    }
  }, [transferamount, user, expensestype, Sessions]);

  useEffect(() => {
    dispatch(getcategory());
    dispatch(GetRoute());
    dispatch(GetVehicleType());
    dispatch(GetVehiclelist());
    dispatch(GetExpensesType());
    dispatch(GetSession());
    dispatch(GetTransferAmmount());
  }, []);
  useEffect(() => {
    let date = new Date();
    let fullyear = date.getFullYear();
    let lastyear = date.getFullYear() - 1;
    setsessionname(`${lastyear}-${fullyear}`);
  }, []);

  return (
    <>
      {open && (
        <div>
          <Dialog
            open={open}
            // TransitionComponent={Transition}
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
            <CashTransfer setOpen={setOpen} />
          </Dialog>
        </div>
      )}
      {openupdate && (
        <div>
          <Dialog
            open={openupdate}
            TransitionComponent={Transition}
            onClose={handleCloseupadte}
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
            <UpdateCashTransfer
              setOpen={setOpenupdate}
              updatedata={updatedata}
            />
          </Dialog>
        </div>
      )}

      {openalert && (
        <>
          <Dialog
            open={openalert}
            onClose={handleClosedelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Do you want to delete"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                After delete you cannot get again
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosedelete}>Disagree</Button>
              <Button onClick={handledelete} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              <div className={styles.searchoptiondiv}>
                <select
                  className={styles.opensearchinput}
                  sx={{
                    width: "18.8rem",
                    fontSize: 14,
                    "& .MuiSelect-select": {
                      paddingTop: "0.6rem",
                      paddingBottom: "0.6em",
                    },
                  }}
                  value={sessionname}
                  name="sessionname"
                  onChange={(e) => setsessionname(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={""}
                  >
                    Select Session
                  </option>

                  {sessionList?.length > 0 &&
                    sessionList?.map((item, index) => {
                      return (
                        <option
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.Session}
                        >
                          {item?.Session}
                        </option>
                      );
                    })}
                </select>
                <label>From Date</label>
                <input
                  className={styles.opensearchinput}
                  type="date"
                  placeholder="Expenses"
                  value={fromdate}
                  name="fromdate"
                  onChange={(e) => setfromdate(e.target.value)}
                />
                <label>To Date</label>
                <input
                  className={styles.opensearchinput}
                  type="date"
                  placeholder="Expenses"
                  value={todate}
                  name="todate"
                  onChange={(e) => settodate(e.target.value)}
                />

                <label>Mode</label>
                <select
                  required
                  className={styles.opensearchinput}
                  value={PayOption}
                  name="PayOption"
                  onChange={(e) => setPayOption(e.target.value)}
                  displayEmpty
                >
                  <option value={""}>All</option>
                  <option value={"Cash"}>Cash</option>
                  <option value={"Online"}>Online</option>
                </select>

                <button onClick={() => filter()}>Search</button>
              </div>
              <button onClick={() => reset()}>Reset</button>
            </div>
            <div className={styles.imgdivformat}>
              <img
                className={styles.imgdivformatimg}
                src="/images/Print.png"
                alt="img"
              />
              <img
                className={styles.imgdivformatimg}
                src="/images/ExportPdf.png"
                alt="img"
              />
              <img src="/images/ExportExcel.png" alt="img" />
            </div>
          </div>

          <div className={styles.addtopmenubar}>
            <button
              className={
                userdata?.data && userdata?.data?.User?.userType === "school"
                  ? styles.addtopmenubarbuttonactive
                  : userdata?.data && userdata?.data?.User?.masterWrite === true
                  ? styles.addtopmenubarbuttonactive
                  : styles.addtopmenubarbuttondisable
              }
              disabled={
                userdata?.data && userdata?.data?.User?.userType === "school"
                  ? false
                  : userdata?.data && userdata?.data?.User?.masterWrite === true
                  ? false
                  : true
              }
              onClick={() => handleClickOpen()}
            >
              Transfer
            </button>
          </div>

          <div className={styles.add_divmarginn}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th className={styles.tableth}>Sr.No</th>
                    <th className={styles.tableth}>Session</th>
                    <th className={styles.tableth}>Date</th>
                    <th className={styles.tableth}>Transfer_Amount</th>
                    <th className={styles.tableth}>Transfer_Mode</th>
                    <th className={styles.tableth}>Comment</th>
                    <th className={styles.tableth}>Action</th>
                  </tr>
                  {isdata?.length > 0 &&
                    isdata?.map((item, index) => {
                      return (
                        <tr key={index} className={styles.tabletr}>
                          <td className={styles.tabletd}>{index + 1}</td>
                          <td className={styles.tabletd}>{item?.Session}</td>
                          <td className={styles.tabletd}>
                            {moment(item?.Date).format("DD/MM/YYYY")}
                          </td>

                          <td className={styles.tabletd}>
                            {item?.Transfer_Amount}
                          </td>
                          <td className={styles.tabletd}>{item?.Transfer_Mode}</td>
                          <td className={styles.tabletd}>{item?.Comment}</td>

                          <td className={styles.tabkeddd}>
                            <button
                              disabled={
                                userdata?.data &&
                                userdata?.data?.User?.userType === "school"
                                  ? false
                                  : userdata?.data &&
                                    userdata?.data?.User?.masterDelete === true
                                  ? false
                                  : true
                              }
                            >
                              <img
                                className={
                                  userdata?.data &&
                                  userdata?.data?.User?.userType === "school"
                                    ? styles.tabkedddimgactive
                                    : userdata?.data &&
                                      userdata?.data?.User?.masterDelete ===
                                        true
                                    ? styles.tabkedddimgactive
                                    : styles.tabkedddimgdisable
                                }
                                onClick={() => ClickOpendelete(item?.id)}
                                src="/images/Delete.png"
                                alt="imgss"
                              />
                            </button>
                            <button
                              disabled={
                                userdata?.data &&
                                userdata?.data?.User?.userType === "school"
                                  ? false
                                  : userdata?.data &&
                                    userdata?.data?.User?.masterEdit === true
                                  ? false
                                  : true
                              }
                            >
                              <img
                                className={
                                  userdata?.data &&
                                  userdata?.data?.User?.userType === "school"
                                    ? styles.tabkedddimgactive
                                    : userdata?.data &&
                                      userdata?.data?.User?.masterEdit === true
                                    ? styles.tabkedddimgactive
                                    : styles.tabkedddimgdisable
                                }
                                onClick={() => ClickOpenupdate(item)}
                                src="/images/Edit.png"
                                alt="imgss"
                              />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default CashBankTransfer;
