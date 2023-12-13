import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetSlider } from "../../../redux/actions/commanAction";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import axios from "axios";
import { backendApiUrl } from "../../../config/config";
const formData = new FormData();
function AddSlider({ setOpen }) {
  const dispatch = useDispatch();
  const [HostelName, setHostelName] = useState("");
  const [DescripTion, setDescripTion] = useState("");
  const [previewprofile1, setpreviewprofile1] = useState("");
  const [loading, setloading] = useState(false);
  const [img1, setimg1] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("erptoken")}`,
        },
      };
      formData.set("Dec", DescripTion);
      formData.set("ImgUrl", img1);
      const res = await axios.post(
        `${backendApiUrl}comman/slider`,
        formData,
        config
      );

      if (res?.data?.status === true) {
        toast.success(res?.data?.msg, {
          autoClose: 1000,
        });
        setOpen(false);
        setloading(false);
        dispatch(GetSlider());
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg, {
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Slider IMG</h1>
        <form onSubmit={submit}>
          <div className={styles.inputdiv20}>
            <label>Slider Description</label>

            <textarea
              required
              className={styles.textarextdiv}
              type="text"
              placeholder="Enter the Description"
              value={DescripTion}
              name="DescripTion"
              onChange={(e) => setDescripTion(e.target.value)}
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
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddSlider;
