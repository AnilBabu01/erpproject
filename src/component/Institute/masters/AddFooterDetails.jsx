import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch } from "react-redux";
import { GetFooterDetails } from "../../../redux/actions/commanAction";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";

function AddFooterDetails({ setOpen }) {
  const dispatch = useDispatch();
  const [facebookurl, setfacebookurl] = useState("");
  const [instagramurl, setinstagramurl] = useState("");
  const [twiterurl, settwiterurl] = useState("");
  const [linkedinurl, setlinkedinurl] = useState("");
  const [PrincipalNo, setPrincipalNo] = useState("");
  const [Chairman, setChairman] = useState("");
  const [Email, setEmail] = useState("");
  const [MapURL, setMapURL] = useState("");
  const [Facilities, setFacilities] = useState("");
  const [loading, setloading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setloading(true);
    const data = {
      facilitycontent: Facilities,
      facebookurl: facebookurl,
      instagramurl: instagramurl,
      twiterurl: twiterurl,
      linkldlurl: linkedinurl,
      ChairmanContactNo: Chairman,
      PrincipalContactNo: PrincipalNo,
      Email: Email,
      Mapurl: MapURL,
    };

    serverInstance("comman/footer", "post", data).then((res) => {
      if (res?.status === true) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setOpen(false);

        setloading(false);
        dispatch(GetFooterDetails());
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
        <h1>Add Footer Details</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>FaceBook URL</label>
              <input
                required
                type="text"
                placeholder="Enter The FaceBook URL"
                value={facebookurl}
                name="facebookurl"
                onChange={(e) => setfacebookurl(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Instagram URL</label>
              <input
                required
                type="text"
                placeholder="Enter The Instagram URL"
                value={instagramurl}
                name="instagramurl"
                onChange={(e) => setinstagramurl(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Twitter URL</label>
              <input
                required
                type="text"
                placeholder="Enter The Twitter URL"
                value={twiterurl}
                name="twiterurl"
                onChange={(e) => settwiterurl(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>linkedin URL</label>
              <input
                required
                type="text"
                placeholder="Enter The FaceBook URL"
                value={linkedinurl}
                name="linkedinurl"
                onChange={(e) => setlinkedinurl(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Principal Contact No</label>
              <input
                required
                type="text"
                placeholder="Enter The Principal Contact No"
                value={PrincipalNo}
                name="PrincipalNo"
                onChange={(e) => setPrincipalNo(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Chairman Contact No</label>
              <input
                required
                type="text"
                placeholder="Enter The Chairman Contact No"
                value={Chairman}
                name="Chairman"
                onChange={(e) => setChairman(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Email</label>
              <input
                required
                type="text"
                placeholder="Enter The Email"
                value={Email}
                name="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Map URL</label>
              <input
                required
                type="text"
                placeholder="Enter The Map URL"
                value={MapURL}
                name="MapURL"
                onChange={(e) => setMapURL(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
            </div>
          </div>
          <label>Facilities</label>
          <textarea
            className={styles.textarextdiv}
            required
            type="text"
            placeholder="Enter The Facilities"
            value={Facilities}
            name="Facilities"
            onChange={(e) => setFacilities(e.target.value)}
          />
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

export default AddFooterDetails;
