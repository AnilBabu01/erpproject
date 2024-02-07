import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { getcategory, getstudent } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function GiveBus({ setOpen, updatedata }) {
  const dispatch = useDispatch();
  const [fromroute, setfromroute] = useState("");
  const [toroute, settoroute] = useState("");
  const [routeid, setrouteid] = useState("");
  const [busdata, setbusdata] = useState("");
  const [routelist, setroutelist] = useState([]);
  const [buslist, setbuslist] = useState([]);
  const [loading1, setloading1] = useState(false);
  const [loading, setloading] = useState(false);
  const { route } = useSelector((state) => state.GetRoute);

  const submit = () => {
    setloading(true);
    serverInstance("transport/assignbus", "post", {
      studentid: updatedata?.id,
      busdetails: busdata,
      fromroute:fromroute,
      toroute:toroute,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        dispatch(getstudent());
        setOpen(false);
        setloading(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        dispatch(getstudent());
        setOpen(false);
        setloading(false);
      }
    });
  };

  
  const getbuslist = () => {
    setloading1(true);
    serverInstance("transport/getbusbyrouteid", "post", {
      routeid: routeid,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });

        setbuslist(res?.data);
        setloading1(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });

        setloading1(false);
      }
    });
  };
  useEffect(() => {
    if (route) {
      setroutelist(route);
    }
  }, [route]);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Assign Bus To Student</h1>
        <div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>From Route</label>
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
                value={routeid}
                name="routeid"
                onChange={(e) => setrouteid(e.target.value)}
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
                {routelist?.length > 0 &&
                  routelist?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.routeName?.id}
                        onClick={() => {
                          setfromroute(item?.routeName?.FromRoute);
                          settoroute(item?.routeName?.ToRoute);
                        }}
                      >
                        {`${item?.routeName?.FromRoute} TO ${item?.routeName?.ToRoute}`}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>

            <div className={styles.inputdiv}>
              <label>&nbsp;</label>
              <button
                onClick={() => getbuslist()}
                disabled={loading1 ? true : false}
                className={styles.logbtnstyle}
              >
                {loading1 ? (
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
                  <th className={styles.tableth}>Bus No</th>
                  <th className={styles.tableth}>Available Sheets</th>
                  <th className={styles.tableth}>Assign</th>
                </tr>
                {buslist?.length > 0 &&
                  buslist?.map((item, index) => {
                    return (
                      <tr key={index} className={styles.tabletr}>
                        <td className={styles.tableth}>
                          {item?.bus?.BusNumber}
                        </td>
                        <td className={styles.tableth}>
                          {item?.bus?.NoOfSheets}
                        </td>
                        <td className={styles.tableth}>
                          <input
                            type="radio"
                            name="vehicle1"
                            // checked={}
                            value={item?.bus}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setbusdata(item?.bus);
                              } else {
                                setbusdata("");
                              }
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className={styles.logbtnstylediv}>
            <button
              onClick={() => submit()}
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
        </div>
      </div>
    </>
  );
}

export default GiveBus;
