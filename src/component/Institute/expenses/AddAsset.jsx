import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetAsset } from "../../../redux/actions/expensesActions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function AddAsset({ setOpen }) {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [assetName, setassetName] = useState("");
  const [assetAmount, setassetAmount] = useState("");
  const [assetComment, setassetComment] = useState("");
  const [assesstypename, setassesstypename] = useState("");
  const [assettypelist, setassettypelist] = useState([]);
  const { assettype } = useSelector((state) => state.GetAssetType);
  var today = new Date();
  var date = today.toISOString().substring(0, 10);
  const [addDate, setaddDate] = useState(date);
  const submit = (e) => {
    e.preventDefault();
    setloading(true);
    serverInstance("expenses/addasset", "post", {
      AssetType: assesstypename,
      Date: addDate,
      AssetName: assetName,
      AssetAmount: assetAmount,
      Comment: assetComment,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetAsset());
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
    if (assettype) {
      setassettypelist(assettype);
    }
  }, [assettype]);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Asset</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Date</label>
              <input
                type="Date"
                value={addDate}
                name="addDate"
                onChange={(e) => setaddDate(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Asset Type</label>
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
                value={assesstypename}
                name="assesstypename"
                onChange={(e) => setassesstypename(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Please Select
                </MenuItem>
                {assettypelist?.length > 0 &&
                  assettypelist?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.AssetType}
                      >
                        {item?.AssetType}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>Asset Name</label>
              <input
                type="text"
                placeholder="Enter Asset Name"
                value={assetName}
                name="assetName"
                onChange={(e) => setassetName(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Asset Amount</label>
              <input
                type="text"
                placeholder="Enter Asset Amount"
                value={assetAmount}
                name="assetAmount"
                onChange={(e) => setassetAmount(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Comment</label>
              <input
                type="text"
                placeholder="Enter Comment"
                value={assetComment}
                name="assetComment"
                onChange={(e) => setassetComment(e.target.value)}
              />
            </div>

            <div className={styles.inputdiv}>
              <label>&nbsp;</label>
              <label>&nbsp;</label>
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

export default AddAsset;
