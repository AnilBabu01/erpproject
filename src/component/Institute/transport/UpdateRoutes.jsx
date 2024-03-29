import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetRoute } from "../../../redux/actions/transportActions";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function UpdateRoutes({ setOpen, updatedata }) {
  const dispatch = useDispatch();
  const [fromroute, setfromroute] = useState("");
  const [toroute, settoroute] = useState("");
  const [permonthRent, setpermonthRent] = useState("");
  const [loading, setloading] = useState(false);

  const [stop, setstop] = useState([
    {
      StopName: "",
      StopStatus: 1,
    },
  ]);

  function addQuestionItem() {
    setstop([
      ...stop,
      {
        StopName: "",
        StopStatus: 1,
      },
    ]);
  }

  function removeQuestionItem(item) {
    setstop(stop.filter((stop) => stop !== item));
  }

  function handleQuestionItemUpdate(originalDonationItem, key, value) {
    setstop(
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
    setloading(true);
    serverInstance("transport/vehicleroute", "put", {
      id: updatedata?.routeName?.id,
      FromRoute: fromroute,
      ToRoute: toroute,
      BusRentPermonth: permonthRent,
      stopslist: stop,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetRoute());
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
    if (updatedata) {
      setfromroute(updatedata?.routeName?.FromRoute);
      settoroute(updatedata?.routeName?.ToRoute);
      setpermonthRent(updatedata?.routeName?.BusRentPermonth);
      setstop(updatedata?.StopName);
    }
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Route</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>From Route</label>
              <input
                type="text"
                placeholder="Enter From Route"
                value={fromroute}
                name="fromroute"
                onChange={(e) => setfromroute(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>To Route</label>
              <input
                type="text"
                placeholder="Enter To Route"
                value={toroute}
                name="toroute"
                onChange={(e) => settoroute(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Per Month Rent</label>
              <input
                type="text"
                placeholder="Enter To Route"
                value={permonthRent}
                name="permonthRent"
                onChange={(e) => setpermonthRent(e.target.value)}
              />
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
                  <th className={styles.tableth}>Action</th>
                </tr>
                {stop?.map((item, index) => {
                  return (
                    <tr key={index} className={styles.tabletr}>
                      <td className={styles.tableth}>
                        <div className={styles.inputdiv}>
                          <input
                            className={styles.maindivclass} 
                            type="text"
                            placeholder="Enter To Route"
                            value={item.StopName}
                            onChange={(e) =>
                              handleQuestionItemUpdate(
                                item,
                                "StopName",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </td>
                      <td className={styles.tableth}>
                      {
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
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateRoutes;
