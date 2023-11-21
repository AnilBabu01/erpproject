import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { getcategory, Addcategory } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
function UpdateGiveRoom({ setOpen }) {
  const dispatch = useDispatch();
  const [Categoryname, setCategoryname] = useState("");

  const { loading, category } = useSelector((state) => state.addcategory);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      category: Categoryname,
    };
    dispatch(Addcategory(data, setOpen));
  };
  useEffect(() => {
    if (category?.status) {
      dispatch(getcategory());
    }
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Room Shift</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Hostal Name</label>
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
                // value={hostal}
                // name="hostal"
                // onChange={(e) => sethostal(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={false}
                >
                  BH1
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={true}
                >
                  BH1
                </MenuItem>
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>Category</label>
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
                // value={transport}
                // name="transport"
                // onChange={(e) => settransport(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={false}
                >
                  2BED
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={true}
                >
                  2BED
                </MenuItem>
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>&nbsp;</label>
              <button
                disabled={loading ? true : false}
                className={styles.logbtnstyle}
              >
                {loading ? (
                  <CircularProgress size={25} style={{ color: "red" }} />
                ) : (
                  "Check Availability"
                )}
              </button>
            </div>
          </div>

          <div>
            <table className={styles.tabletable}>
              <tbody>
                <tr className={styles.tabletr}>
                  <th className={styles.tableth}>Booked</th>
                  <th className={styles.tableth}>Room No</th>
                  <th className={styles.tableth}>Category</th>
                  <th className={styles.tableth}>Facility</th>
                </tr>

                <tr className={styles.tabletr}>
                  <td className={styles.tableth}>
                    <input type="checkbox" name="vehicle1" value="Bike" />
                  </td>
                  <td className={styles.tableth}>1</td>
                  <td className={styles.tableth}>2BED</td>
                  <td className={styles.tableth}>AC</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.logbtnstylediv}>
            <button
              disabled={loading ? true : false}
              className={styles.logbtnstyle}
            >
              {loading ? (
                <CircularProgress size={25} style={{ color: "red" }} />
              ) : (
                "Save Room"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateGiveRoom;
