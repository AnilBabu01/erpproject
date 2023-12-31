import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetTransferAmmount } from "../../../redux/actions/expensesActions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function UpdateCashTransfer({ setOpen, updatedata }) {
  const dispatch = useDispatch();
  const [PayOption, setPayOption] = useState("Cash");
  const [addDate, setaddDate] = useState("");
  const [Expensestype, setExpensestype] = useState("");
  const [ExpensesAmount, setExpensesAmount] = useState("");
  const [Comment, setComment] = useState("");
  const [loading, setloading] = useState(false);
  
  const [expenseslist, setexpenseslist] = useState([]);

  const { expensestype } = useSelector((state) => state.GetExpensesType);

  const submit = (e) => {
    e.preventDefault();
    setloading(true);
    serverInstance("expenses/amounttransfer", "put", {
      id: updatedata?.id,
      addDate: addDate,
      Transfer_Amount: ExpensesAmount,
      Comment: Comment,
      Transfer_Mode: PayOption,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetTransferAmmount());
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });

        setloading(false);
      }
    });
  };

  useEffect(() => {
    if (expensestype) {
      setexpenseslist(expensestype);
    }
  }, [expensestype]);

  useEffect(() => {
    if (updatedata) {
      setExpensesAmount(updatedata?.Transfer_Amount);
      setComment(updatedata?.Comment);
      setExpensestype(updatedata?.Expensestype);
      setPayOption(updatedata?.Transfer_Mode)
      var today = new Date(updatedata?.Date);
      var date = today.toISOString().substring(0, 10);
      setaddDate(date);
    }
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Cash / Bank Transfer</h1>
        <form onSubmit={submit}>
        <div className={styles.mainpayselect}>
            <div className={styles.stylecash}>
              <input
                className={styles.paytypeselect}
                type="radio"
                value={"Cash"}
                checked={PayOption === "Cash"}
                name="same"
                onChange={(e) => setPayOption(e.target.value)}
              />
              <label>Cash</label>
            </div>
            <div className={styles.stylecash}>
              <input
                className={styles.paytypeselect}
                type="radio"
                value={"Online"}
                checked={PayOption === "Online"}
                name="same"
                onChange={(e) => setPayOption(e.target.value)}
              />
              <label>Online</label>
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Date</label>
              <input
                type="date"
                value={addDate}
                name="addDate"
                onChange={(e) => setaddDate(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Expenses Amount</label>
              <input
                type="text"
                placeholder="Enter Expenses Amount"
                value={ExpensesAmount}
                name="ExpensesAmount"
                onChange={(e) => setExpensesAmount(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Comment</label>
              <input
                type="text"
                placeholder="Enter Comment"
                value={Comment}
                name="Comment"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.logbtnstylediv}>
            <button
              disabled={loading ? true : false}
              className={styles.logbtnstyle}
            >
              {loading ? (
                <CircularProgress size={25} style={{ color: "red" }} />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateCashTransfer;
