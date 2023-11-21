import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { getcategory, Addcategory } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function UpdateHostel({ setOpen }) {
  const dispatch = useDispatch();
  const [Categoryname, setCategoryname] = useState("");
  const [previewprofile1, setpreviewprofile1] = useState("");
  const [img1,setimg1] = useState("");
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
        <h1>Update Hostel</h1>
        <form onSubmit={submit}>
          <div className={styles.inputdiv20}>
            <label>Hostel Name</label>
            <input
              type="text"
              placeholder="Enter the Hostel Name"
              value={Categoryname}
              name="Categoryname"
              onChange={(e) => setCategoryname(e.target.value)}
            />
          </div>
          <div className={styles.inputdiv20}>
            <label>Hostel Description</label>
            <input
              type="text"
              placeholder="Enter the Description"
              value={Categoryname}
              name="Categoryname"
              onChange={(e) => setCategoryname(e.target.value)}
            />
          </div>
         

          <div className={styles.inputdiv20}>
            {previewprofile1 ? (
              <>
                <div className={styles.main_img_divvvv}>
                  <img
                    className={styles.dharamshala_imgggg}
                    src={previewprofile1}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.main_img_divvvv}>
                  <img src="/images/camera.png" />
                </div>
              </>
            )}

            <div className={styles.formdivvv_imf}>
              <input
                type="file"
                onChange={(e) => {
                    setimg1(e.target.files[0]);
                  console.log(e.target.files[0]);
                  setpreviewprofile1(URL.createObjectURL(e.target.files[0]));
                }}
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
                "Update Hostel"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateHostel;
