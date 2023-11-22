import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { getcategory, Addcategory } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
function UpdateRoutes({ setOpen }) {
  const dispatch = useDispatch();
  const [Categoryname, setCategoryname] = useState("");
  const { loading, category } = useSelector((state) => state.addcategory);

  const [stop, setstop] = useState([
    {
      Stop: "",
    },
  ]);

  function addQuestionItem() {
    setstop([
      ...stop,
      {
        Stop: "",
      },
    ]);
  }

  function removeQuestionItem(item) {
    setstop(stop.filter((stop) => stop !== item));
  }

  function handleQuestionItemUpdate(originalDonationItem, key, value) {
    setquestionItems(
      stop.map((stop) =>
        stop === originalDonationItem
          ? {
              ...stop,
              [key]: value,
            }
          : stop
      )
    );
  }

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
        <h1>Add Route</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>From Route</label>
              <input
                type="text"
                placeholder="Enter From Route"
                // value={Categoryname}
                // name="Categoryname"
                // onChange={(e) => setCategoryname(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>To Route</label>
              <input
                type="text"
                placeholder="Enter To Route"
                // value={Categoryname}
                // name="Categoryname"
                // onChange={(e) => setCategoryname(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>&nbsp;</label>
              <label>&nbsp;</label>
            </div>
          </div>
          <div>
            <table className={styles.tabletable}>
              <tbody>
                <tr className={styles.tabletr}>
                  <th className={styles.tableth20}>
                    Stop Name
                    <IconButton aria-label="add" size="small">
                      <AddBoxIcon color="primary" onClick={addQuestionItem} />
                    </IconButton>
                  </th>
                  <th className={styles.tableth}>Status</th>
                </tr>
                {stop?.map((item, index) => {
                  return (
                    <tr key={index} className={styles.tabletr}>
                      <td className={styles.tableth}>BS01</td>
                      <td className={styles.tableth}>
                        <Select
                          required
                          className={styles.addwidth}
                          sx={{
                            width: "10.8rem",
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
                          endAdornment={
                            index > 0 && (
                              <InputAdornment position="start">
                                <IconButton
                                  sx={{
                                    padding: "4px",
                                  }}
                                  onClick={() => removeQuestionItem(item)}
                                >
                                  <RemoveCircleOutlineIcon
                                    color="primary"
                                    fontSize="small"
                                  />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        >
                          <MenuItem
                            sx={{
                              fontSize: 14,
                            }}
                            value={false}
                          >
                            Enable
                          </MenuItem>
                          <MenuItem
                            sx={{
                              fontSize: 14,
                            }}
                            value={true}
                          >
                            Disable
                          </MenuItem>
                        </Select>
                      </td>
                    </tr>
                  );
                })}
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
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateRoutes;
