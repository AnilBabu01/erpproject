import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { getcategory, Addcategory } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
function AddvehicleDetails({ setOpen }) {
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
        <h1>Add Vehicle Details</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Vehicle Type</label>
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
              <label>Routes</label>
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
                  Bisalput To Pilibhit
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
              <label>Bus Number</label>
              <input
                type="text"
                placeholder="Enter The Bus Number"
                // value={Categoryname}
                // name="Categoryname"
                // onChange={(e) => setCategoryname(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Fuel Type</label>
              <input
                type="text"
                placeholder="Enter The Fuel Type"
                // value={Categoryname}
                // name="Categoryname"
                // onChange={(e) => setCategoryname(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Color</label>
              <input
                type="text"
                placeholder="Enter The Color"
                // value={Categoryname}
                // name="Categoryname"
                // onChange={(e) => setCategoryname(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>GPS Device URL</label>
              <input
                type="text"
                placeholder="Enter The GPS Device URL"
                // value={Categoryname}
                // name="Categoryname"
                // onChange={(e) => setCategoryname(e.target.value)}
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

export default AddvehicleDetails;
