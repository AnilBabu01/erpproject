import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getfee, AddFee } from "../../../redux/actions/commanAction";
import CircularProgress from "@mui/material/CircularProgress";
function Addfee({ setOpen }) {
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [coursename, setcoursename] = useState("");
  const [registrationfee, setregistrationfee] = useState("");
  const [permonthfee, setpermonthfee] = useState("");
  const [courseduration, setcourseduration] = useState("");
  const { loading, course } = useSelector((state) => state.addfee);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      Registractionfee: registrationfee,
      feepermonth: permonthfee,
      coursename: coursename,
      courseduration: courseduration,
    };
    dispatch(AddFee(data, setOpen));
  };
  useEffect(() => {
    if (course?.status) {
      dispatch(getfee());
    }
  }, []);

  useEffect(() => {
    if (course) {
      setisData(course);
    }
  }, [course]);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Fee</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Course</label>
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
                value={coursename}
                name="coursename"
                onChange={(e) => setcoursename(e.target.value)}
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
                {isdata?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.coursename}
                      onClick={() => {
                        setcourseduration(item?.courseduration);
                      }}
                    >
                      {item?.coursename}
                    </MenuItem>
                  );
                })}
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
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addfee;
