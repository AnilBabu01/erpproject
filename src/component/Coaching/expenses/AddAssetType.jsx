import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetAssetType } from "../../../redux/actions/expensesActions";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function AddAssetType({ setOpen }) {
  const dispatch = useDispatch();

  const [AssetType, setAssetType] = useState("");
  const [loading, setloading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setloading(true);
    serverInstance("expenses/addassettype", "post", {
      AssetType: AssetType,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetAssetType());
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });

        setloading(false);
      }
    });
  };

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Asset Type</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Asset_Type</label>
              <input
                type="text"
                placeholder="Enter The Asset Type"
                value={AssetType}
                name="AssetType"
                onChange={(e) => setAssetType(e.target.value)}
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

export default AddAssetType;
