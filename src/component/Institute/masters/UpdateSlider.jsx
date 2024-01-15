import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { GetSlider } from "../../../redux/actions/commanAction";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import axios from "axios";
import { backendApiUrl, backendUrl } from "../../../config/config";

const formData = new FormData();
function UpdateSlider({ setOpen, updatedata }) {
  const dispatch = useDispatch();
  const [HostelName, setHostelName] = useState("");
  const [DescripTion, setDescripTion] = useState("");
  const [previewprofile1, setpreviewprofile1] = useState("");
  const [loading, setloading] = useState(false);
  const [img1, setimg1] = useState("");

  console.log("img url from update", updatedata);

  const submit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("erptoken")}`,
        },
      };
      formData.set("id", updatedata?.id);
      formData.set("Dec", DescripTion);
      formData.set("ImgUrl", img1 ? img1 : updatedata?.Hostelurl);
      const res = await axios.put(
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

  useEffect(() => {
    if (updatedata) {
      setHostelName(updatedata?.ImgUrl);
      setDescripTion(updatedata?.Dec);
    }
  }, []);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Slider IMG</h1>
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
                  alt="img"
                    className={styles.dharamshala_imgggg}
                    src={previewprofile1}
                  />
                </div>
              </>
            ) : (
              <>
                {updatedata?.ImgUrl ? (
                  <>
                    <div className={styles.main_img_divvvv}>
                      <img
                        alt="img"
                        className={styles.dharamshala_imgggg}
                        src={updatedata?.ImgUrl}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.main_img_divvvv}>
                      <img alt="img" src="/images/camera.png" />
                    </div>
                  </>
                )}
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
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateSlider;
