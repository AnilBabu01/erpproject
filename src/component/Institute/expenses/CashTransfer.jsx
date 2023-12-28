import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetTransferAmmount } from "../../../redux/actions/expensesActions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function CashTransfer({ setOpen }) {
  const dispatch = useDispatch();
  var today = new Date();
  var date = today.toISOString().substring(0, 10);
  const [PayOption, setPayOption] = useState("Cash");
  const [addDate, setaddDate] = useState(date);
  const [expenseslist, setexpenseslist] = useState([]);
  const [ExpensesAmount, setExpensesAmount] = useState("");
  const [Comment, setComment] = useState("");
  const [loading, setloading] = useState(false);

  const { expensestype } = useSelector((state) => state.GetExpensesType);

  const submit = (e) => {
    e.preventDefault();
    setloading(true);
    serverInstance("expenses/amounttransfer", "post", {
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

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Cash / Bank Transfer</h1>

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
              <label>Transfer Amount</label>
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
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CashTransfer;
