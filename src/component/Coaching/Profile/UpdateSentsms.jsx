import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { UpdateProfile } from "../../../redux/actions/coachingAction";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { UPDATE_RESET_PROFILE_SUCCESS } from "../../../redux/constants/coachingContants";
const formData = new FormData();
function UpdateSentsms({ setOpen }) {
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
  const [studentpassword, setstudentpassword] = useState("");
  const [parentpassword, setparentpassword] = useState("");
  const [sendemail, setsendemail] = useState("");
  const [sendemailpassword, setsendemailpassword] = useState("");
  const { isUpdated } = useSelector((state) => state.editprofile);
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
    formData.set("Studentpassword", studentpassword);
    formData.set("Parentpassword", parentpassword);
    formData.set("SendemailPassword", sendemailpassword);
    formData.set("Sendemail", sendemail);
    dispatch(UpdateProfile(formData, setOpen));
  };
  useEffect(() => {
    if (user) {
      setowername(user?.data[0]?.name);
      setemail(user?.data[0]?.email);
      setaddress(user?.data[0]?.address);
      setcity(user?.data[0]?.city);
      setorganizationName(user?.data[0]?.institutename);
      setpincode(user?.data[0]?.pincode);
      setstate(user?.data[0]?.state);
      setphoneno1(user?.data[0]?.phoneno1);
      setphoneno2(user?.data[0]?.phoneno1);
      setstudentpassword(user?.data[0]?.Studentpassword);
      setparentpassword(user?.data[0]?.Parentpassword);
      setsendemailpassword(user?.data[0]?.SendemailPassword)
      setsendemail(user?.data[0]?.Sendemail)
    }
  }, []);
  useEffect(() => {
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({
        type: UPDATE_RESET_PROFILE_SUCCESS,
      });
    }
  }, [isUpdated]);

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Update Communication Details</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Email</label>
              <input
                required
                type="text"
                placeholder="Admin@gmail.com"
                value={sendemail}
                name="sendemail"
                onChange={(e) => setsendemail(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Password</label>
              <input
                required
                type="text"
                placeholder="Admin@123"
                value={sendemailpassword}
                name="sendemailpassword"
                onChange={(e) => setsendemailpassword(e.target.value)}
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

export default UpdateSentsms;
