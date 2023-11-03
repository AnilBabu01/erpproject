import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { Updatecredentials } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { UPDATE_CREDENTIALS_RESET_SUCCESS } from "../../../redux/constants/commanConstants";
const formData = new FormData();
function Updateprofile({ setOpen }) {
  const dispatch = useDispatch();
  const [owername, setowername] = useState("");
  const [email, setemail] = useState("");
  const [phoneno1, setphoneno1] = useState("");
  const [phoneno2, setphoneno2] = useState("");
  const [organizationName, setorganizationName] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const { isUpdated } = useSelector((state) => state.updateCredentials);
  const { user } = useSelector((state) => state.auth);

  const submit = (e) => {
    e.preventDefault();
    formData.set("name", owername);
    formData.set("email", email);
    formData.set("institutename", organizationName);
    formData.set("phoneno1", phoneno1);
    formData.set("phoneno2", phoneno2);
    formData.set("address", address);
    formData.set("city", city);
    formData.set("state", state);
    formData.set("pincode", pincode);
    formData.set("profileurl", user?.data?.CredentailsData?.profileurl);
    formData.set("certificatelogo",user?.data?.CredentailsData?.certificatelogo);
    formData.set("logourl", user?.data?.CredentailsData?.logourl);
    dispatch(Updatecredentials(formData, setOpen));
  };
  useEffect(() => {
    if (user) {
      setowername(user?.data?.CredentailsData?.name);
      setemail(user?.data?.CredentailsData?.email);
      setaddress(user?.data?.CredentailsData?.address);
      setcity(user?.data?.CredentailsData?.city);
      setorganizationName(user?.data?.CredentailsData?.institutename);
      setpincode(user?.data?.CredentailsData?.pincode);
      setstate(user?.data?.CredentailsData?.state);
      setphoneno1(user?.data?.CredentailsData?.phoneno1);
      setphoneno2(user?.data?.CredentailsData?.phoneno1);
    }
  }, []);
  useEffect(() => {
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({
        type: UPDATE_CREDENTIALS_RESET_SUCCESS,
      });
    }
  }, [isUpdated]);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Institute Details</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Owner Name</label>
              <input
                required
                type="text"
                placeholder="Enter the Owner Name"
                value={owername}
                name="owername"
                onChange={(e) => setowername(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Official Email</label>
              <input
                required
                type="text"
                placeholder="Enter the Official Email"
                value={email}
                name="email"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Institute Name</label>
              <input
                required
                type="text"
                placeholder="Enter the Institute Name"
                value={organizationName}
                name="organizationName"
                onChange={(e) => setorganizationName(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Phone No1</label>
              <input
                required
                type="text"
                placeholder="Enter the PhoneNO1"
                value={phoneno1}
                name="phoneno1"
                onChange={(e) => setphoneno1(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Phone No2</label>
              <input
                required
                type="text"
                placeholder="Enter the PhoneNO2"
                value={phoneno2}
                name="phoneno2"
                onChange={(e) => setphoneno2(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>City</label>
              <input
                required
                type="text"
                placeholder="Enter the City"
                value={city}
                name="city"
                onChange={(e) => setcity(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>State</label>
              <input
                required
                type="text"
                placeholder="Enter the State"
                value={state}
                name="state"
                onChange={(e) => setstate(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Address</label>
              <input
                required
                type="text"
                placeholder="Enter the Address"
                value={address}
                name="address"
                onChange={(e) => setaddress(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Pin Code</label>
              <input
                required
                type="text"
                placeholder="Enter the Pin Code"
                value={pincode}
                name="pincode"
                onChange={(e) => setpincode(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}>Update</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Updateprofile;
