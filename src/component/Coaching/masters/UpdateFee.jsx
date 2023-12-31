import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Updatefee } from "../../../redux/actions/commanAction";
import CircularProgress from "@mui/material/CircularProgress";
function UpdateFee({ updatedata, setOpen }) {
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [coursename, setcoursename] = useState("");
  const [registrationfee, setregistrationfee] = useState("");
  const [permonthfee, setpermonthfee] = useState("");
  const [courseduration, setcourseduration] = useState("");
  const { loading, course } = useSelector((state) => state.editfee);
  console.log("course data from add fee", updatedata?.coursename);
  const submit = (e) => {
    e.preventDefault();
    const data = {
      id: updatedata?.id,
      Registractionfee: registrationfee,
      feepermonth: permonthfee,
      coursename: coursename,
      courseduration: courseduration,
    };
    dispatch(Updatefee(data, setOpen));
  };
  useEffect(() => {
    if (course) {
      setisData(course);
    }
  }, [course]);

  useEffect(() => {
    if (updatedata) {
      setcoursename(updatedata?.coursename);
      setregistrationfee(updatedata?.Registractionfee);
      setpermonthfee(updatedata?.feepermonth);
      setcourseduration(updatedata?.courseduration);
    }
  }, []);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Fee</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Class</label>
              <Select
                disabled={true}
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
                value={coursename}
                name="coursename"
                onChange={(e) => setcoursename(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={coursename}
                >
                {coursename}
                </MenuItem>
               
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>Registration Fee</label>
              <input
                required
                type="text"
                placeholder="Enter the Registration Fee"
                value={registrationfee}
                name="registrationfee"
                onChange={(e) => setregistrationfee(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Per Month Fee</label>
              <input
                required
                type="text"
                placeholder="Enter the Per Month Fee"
                value={permonthfee}
                name="permonthfee"
                onChange={(e) => setpermonthfee(e.target.value)}
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

export default UpdateFee;
