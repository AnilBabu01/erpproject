import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetVehicleType } from "../../../redux/actions/transportActions";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";

function AddVehiceType({ setOpen }) {
  const dispatch = useDispatch();
  const [VehicleType, setVehicleType] = useState("");
  const [loading, setloading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setloading(true);
    serverInstance("transport/vehicletype", "post", {
      Vahicletype: VehicleType,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetVehicleType());
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
        <h1>Add Vehicle Type</h1>
        <form onSubmit={submit}>
         
            <div className={styles.inputdiv20}>
              <label>Vehicle Type</label>
              <input
                type="text"
                placeholder="Enter the Vehicle Type"
                value={VehicleType}
                name="VehicleType"
                onChange={(e) => setVehicleType(e.target.value)}
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

export default AddVehiceType;
