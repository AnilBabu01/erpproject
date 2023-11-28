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
function UpdateVehicleDetails({ setOpen,updatedata }) {
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
    serverInstance("transport/vehicledetails", "put", {
      id:updatedata?.bus?.id,
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


  useEffect(() => {
    if(updatedata)
    {
      setColor(updatedata?.bus?.Color)
      setBusNumber(updatedata?.bus?.BusNumber);
      setFualType(updatedata?.bus?.FualType);
      setGPSDeviceURL(updatedata?.bus?.GPSDeviceURL);
      setvehicletypename(updatedata?.bus?.Vahicletype);
      setrouteId(updatedata?.bus?.routeId);
    }
  }, [])
  

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Bus</h1>
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
                value={routeId}
                name="routeId"
                onChange={(e) => setrouteId(e.target.value)}
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
                      >
                        {`${item?.routeName?.FromRoute} To ${item?.routeName?.ToRoute}`}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>Bus Number</label>
              <input
                type="text"
                placeholder="Enter The Bus Number"
                value={BusNumber}
                name="BusNumber"
                onChange={(e) => setBusNumber(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Fuel Type</label>
              <input
                type="text"
                placeholder="Enter The Fuel Type"
                value={FualType}
                name="FualType"
                onChange={(e) => setFualType(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Color</label>
              <input
                type="text"
                placeholder="Enter The Color"
                value={Color}
                name="Color"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>GPS Device URL</label>
              <input
                type="text"
                placeholder="Enter The GPS Device URL"
                value={GPSDeviceURL}
                name="GPSDeviceURL"
                onChange={(e) => setGPSDeviceURL(e.target.value)}
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

export default UpdateVehicleDetails;
