import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetExpenses } from "../../../redux/actions/expensesActions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function AddExpenses({ setOpen }) {
  const dispatch = useDispatch();
  var today = new Date();
  var date = today.toISOString().substring(0, 10);
  const [PayOption, setPayOption] = useState("Cash");
  const [addDate, setaddDate] = useState(date);
  const [Expensestype, setExpensestype] = useState("Expenses");
  const [expenseslist, setexpenseslist] = useState([]);
  const [ExpensesAmount, setExpensesAmount] = useState("");
  const [Comment, setComment] = useState("");
  const [loading, setloading] = useState(false);

  const { expensestype } = useSelector((state) => state.GetExpensesType);

  const submit = (e) => {
    e.preventDefault();
    setloading(true);
    serverInstance("expenses/addexpenses", "post", {
      addDate: addDate,
      Expensestype: Expensestype,
      ExpensesAmount: ExpensesAmount,
      Comment: Comment,
      PayOption:PayOption
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetExpenses());
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
        <h1>Add Expenses</h1>

        <form onSubmit={submit}>
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
            <div className={styles.inputdiv}>
              <label>&nbsp;</label>
              <label>&nbsp;</label>
            </div>
          </div>

          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Payment_Out_Type</label>
              <Select
                required
                className={styles.addwidth}
                sx={{
                  width: "18.8rem",
                  fontSize: 14,
                  "& .MuiSelect-select": {
                    paddingTop: "0.6rem",
                    paddingBottom: "0.6em",
                  },
                }}
                value={Expensestype}
                name="Expensestype"
                onChange={(e) => setExpensestype(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"Expenses"}
                >
                  Expenses
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"Asset"}
                >
                  Asset
                </MenuItem>

                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={"Liability"}
                >
                  Liability
                </MenuItem>
              </Select>
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
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddExpenses;
