import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetHostel, GetCategory } from "../../../redux/actions/hostelActions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
function GIveRoom({ setOpen, updatedata }) {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const [hostelnameId, sethostelnameId] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const [roomdetail, setroomdetail] = useState("");
  const [loading1, setloading1] = useState(false);
  const [loading, setloading] = useState(false);
  const [roomlist, setroomlist] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [hostelList, sethostelList] = useState([]);
  const { hostel } = useSelector((state) => state.GetHostel);
  const { roomcategory } = useSelector((state) => state.GetCategory);

  const checkroom = () => {
    setloading1(true);
    
    serverInstance("hostel/CheckinRoom", "post", {
      roomdetails: roomdetail,
      studentdetails: updatedata,
    }).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });

        navigation.push({
          pathname: "/school/hostel/CheckinReceipt",
          query: {
            receiptdata: JSON.stringify(res?.data),
          },
        });
        setOpen(false);
        setloading1(false);
      }
      if (res?.status === false) {
        toast.error(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);
        setloading1(false);
      }
    });
  };

  const CheckAvailability = () => {
    setloading(true);
    serverInstance("hostel/CheckAvailability", "post", {
      hostelname: hostelnameId,
      Category: CategoryId,
    }).then((res) => {
      if (res?.status === true) {
        setroomlist(res?.data);
        setloading(false);
      }
    });
  };
  useEffect(() => {
    dispatch(GetCategory());
    dispatch(GetHostel());
  }, []);

  useEffect(() => {
    if (hostel) {
      sethostelList(hostel);
    }
    if (roomcategory) {
      setcategoryList(roomcategory);
    }
  }, [hostel, roomcategory]);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Assign Room To Student</h1>
        <div>
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
                value={hostelnameId}
                name="hostelnameId"
                onChange={(e) => sethostelnameId(e.target.value)}
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

                {hostelList?.length > 0 &&
                  hostelList?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.id}
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
                value={CategoryId}
                name="CategoryId"
                onChange={(e) => setCategoryId(e.target.value)}
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
                {categoryList?.length > 0 &&
                  categoryList?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.id}
                      >
                        {item?.roomCategory}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <div className={styles.inputdiv}>
              <label>&nbsp;</label>
              <button
                onClick={() => CheckAvailability()}
                // disabled={loading ? true : false}
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

          <div className={styles.roomlistscrollbar}>
            <table className={styles.tabletable}>
              <tbody>
                <tr className={styles.tabletr}>
                  <th className={styles.tableth}>Booked</th>
                  <th className={styles.tableth}>Room No</th>
                  <th className={styles.tableth}>Category</th>
                  <th className={styles.tableth}>Facility</th>
                </tr>
                {roomlist?.length > 0 &&
                  roomlist?.map((item, index) => {
                    return (
                      <tr className={styles.tabletr}>
                        <td className={styles.tableth} key={index}>
                          <input
                            type="checkbox"
                            name="vehicle1"
                            value="Bike"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setroomdetail(item);
                              } else {
                                setroomdetail("");
                              }
                            }}
                          />
                        </td>
                        <td className={styles.tableth}>{item?.RoomNo}</td>
                        <td className={styles.tableth}>
                          {item?.category_name}
                        </td>
                        <td className={styles.tableth}>
                          {item?.facility_name}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className={styles.logbtnstylediv}>
            <button
              onClick={() => checkroom()}
              disabled={loading1 ? true : false}
              className={styles.logbtnstyle}
            >
              {loading1 ? (
                <CircularProgress size={25} style={{ color: "red" }} />
              ) : (
                "Save Room"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GIveRoom;
