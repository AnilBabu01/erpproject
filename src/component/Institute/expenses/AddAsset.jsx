import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetVehiclelist } from "../../../redux/actions/transportActions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function AddAsset({ setOpen }) {
  const dispatch = useDispatch();
  const [routeId, setrouteId] = useState("");
  const [BusNumber, setBusNumber] = useState("");
  const [FualType, setFualType] = useState("");
  const [Color, setColor] = useState("");
  const [vehicletypename, setvehicletypename] = useState("");
  const [GPSDeviceURL, setGPSDeviceURL] = useState("");
  const [loading, setloading] = useState(false);
  const [routelist, setroutelist] = useState([]);
  const [vehiclelist, setvehiclelist] = useState([]);

  const { route } = useSelector((state) => state.GetRoute);
  const { vehicletype } = useSelector((state) => state.GetVehicleType);

  console.log("data from add bus details", routelist, vehiclelist);

  const submit = (e) => {
    e.preventDefault();
    setloading(true);
    serverInstance("transport/vehicledetails", "post", {
      routeId: routeId,
      Vahicletype: vehicletypename,
      BusNumber: BusNumber,
      FualType: FualType,
      Color: Color,
      GPSDeviceURL: GPSDeviceURL,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetVehiclelist());
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
    if (route) {
      setroutelist(route);
    }
    if (vehicletype) {
      setvehiclelist(vehicletype);
    }
  }, [route, vehicletype]);

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
                value={vehicletypename}
                name="vehicletypename"
                onChange={(e) => setvehicletypename(e.target.value)}
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
                {vehiclelist?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.id}
                    >
                      {item?.Vahicletype}
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
                value={Color}
                name="Color"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Asset Amount</label>
              <input
                type="text"
                placeholder="Enter Asset Amount"
                value={GPSDeviceURL}
                name="GPSDeviceURL"
                onChange={(e) => setGPSDeviceURL(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.inputdiv}>
            <label>Comment</label>
            <input
              type="text"
              placeholder="Enter Comment"
              value={GPSDeviceURL}
              name="GPSDeviceURL"
              onChange={(e) => setGPSDeviceURL(e.target.value)}
            />
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
