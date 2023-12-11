import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import {
  GetCategory,
  GetHostel,
  GetFacility,
  GetRoom,
} from "../../../redux/actions/hostelActions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
function AddRoom({ setOpen }) {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [Facilitys, setFacilitys] = useState([]);
  const [Categorys, setCategorys] = useState([]);
  const [hostels, sethostels] = useState([]);
  const [hostelId, sethostelId] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [FacilityId, setFacilityId] = useState("");
  const [Facilityname, setFacilityname] = useState("");
  const [categoryname, setcategoryname] = useState("");
  const [hostelname, sethostelname] = useState("");
  const [fromroom, setfromroom] = useState("");
  const [toroom, settoroom] = useState("");
  const [comment, setcomment] = useState("");
  const [amountpermonth, setamountpermonth] = useState("");
  const { roomfacility } = useSelector((state) => state.GetFacility);
  const { roomcategory } = useSelector((state) => state.GetCategory);
  const { hostel } = useSelector((state) => state.GetHostel);
  const submit = (e) => {
    e.preventDefault();
    setloading(true);
    serverInstance("hostel/addroom", "post", {
      HostelName: hostelname,
      Category: categoryname,
      Facility: Facilityname,
      hostelId: hostelId,
      CategoryId: CategoryId,
      FacilityId: FacilityId,
      FromRoom: fromroom,
      ToRoom: toroom,
      PermonthFee: amountpermonth,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetRoom());
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
    dispatch(GetCategory());
    dispatch(GetFacility());
    dispatch(GetHostel());
  }, []);

  useEffect(() => {
    if (roomcategory) {
      setCategorys(roomcategory);
    }
    if (roomfacility) {
      setFacilitys(roomfacility);
    }
    if (hostel) {
      sethostels(hostel);
    }
  }, [roomcategory, roomfacility, hostel]);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Room</h1>
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
                value={hostelname}
                name="hostelname"
                onChange={(e) => sethostelname(e.target.value)}
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
                {hostels?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.HostelName}
                      onClick={() => sethostelId(item?.id)}
                    >
                      {item?.HostelName}
                    </MenuItem>
                  );
                })}
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
                value={categoryname}
                name="categoryname"
                onChange={(e) => setcategoryname(e.target.value)}
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
                {Categorys?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.roomCategory}
                      onClick={() => setCategoryId(item?.id)}
                    >
                      {item?.roomCategory}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>Facility</label>
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
                value={Facilityname}
                name="Facilityname"
                onChange={(e) => setFacilityname(e.target.value)}
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
                {Facilitys?.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        fontSize: 14,
                      }}
                      value={item?.roomFacility}
                      onClick={() => setFacilityId(item?.id)}
                    >
                      {item?.roomFacility}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>From Room No Range</label>
              <input
                type="text"
                placeholder="Enter the From Room Range"
                value={fromroom}
                name="fromroom"
                onChange={(e) => setfromroom(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>To Room No Range</label>
              <input
                type="text"
                placeholder="Enter the To Room Range"
                value={toroom}
                name="toroom"
                onChange={(e) => settoroom(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Price Per Month</label>
              <input
                type="text"
                placeholder="Enter The Price Per Month"
                value={amountpermonth}
                name="amountpermonth"
                onChange={(e) => setamountpermonth(e.target.value)}
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

export default AddRoom;
