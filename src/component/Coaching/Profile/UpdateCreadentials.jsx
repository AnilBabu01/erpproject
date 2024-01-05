import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { Updatecredentials } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { UPDATE_CREDENTIALS_RESET_SUCCESS } from "../../../redux/constants/commanConstants";
import CircularProgress from "@mui/material/CircularProgress";
const formData = new FormData();
function UpdateCreadentials({ updatedata, setOpen }) {
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
  const [Employeepassword, setEmployeepassword] = useState("");
  const { isUpdated ,loading} = useSelector((state) => state.updateCredentials);
  const { user } = useSelector((state) => state.auth);
  const submit = (e) => {
    e.preventDefault();
    formData.set("id", updatedata?.id);
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
    formData.set("Employeepassword", Employeepassword);
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
      setstudentpassword(user?.data?.CredentailsData?.Studentpassword);
      setparentpassword(user?.data?.CredentailsData?.Parentpassword);
      setEmployeepassword(user?.data?.CredentailsData?.Employeepassword);
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
        <h1>Update Credentials Details</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={styles.inputdiv}>
              <label>Student Default Password</label>
              <input
                required
                type="text"
                // placeholder="Student@123"
                value={studentpassword}
                name="studentpassword"
                onChange={(e) => setstudentpassword(e.target.value)}
              />
            </div>
            <div className={styles.inputdiv}>
              <label>Parent Default Password</label>
              <input
                required
                type="text"
                // placeholder="Parent@123"
                value={parentpassword}
                name="parentpassword"
                onChange={(e) => setparentpassword(e.target.value)}
              />
            </div>

            <div className={styles.inputdiv}>
              <label>Employee Default Password</label>
              <input
                required
                type="text"
                // placeholder="Parent@123"
                value={Employeepassword}
                name="Employeepassword"
                onChange={(e) => setEmployeepassword(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.logbtnstylediv}>
            <button className={styles.logbtnstyle}> {loading ? (
                <CircularProgress size={25} style={{ color: "red" }} />
              ) : (
                "Update"
              )}</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateCreadentials;
