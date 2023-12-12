import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { Updatecredentials } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { UPDATE_CREDENTIALS_RESET_SUCCESS } from "../../../redux/constants/commanConstants";
const formData = new FormData();
function DisableOptions({ updatedata, setOpen }) {
  const dispatch = useDispatch();
  const [frontofficeStatus, setfrontofficeStatus] = useState(false);
  const [Librarystatus, setLibrarystatus] = useState("");
  const [HostelStatus, setHostelStatus] = useState("");
  const [TransportStatus, setTransportStatus] = useState("");
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
  const { isUpdated } = useSelector((state) => state.updateCredentials);
  const { user } = useSelector((state) => state.auth);
  const submit = (e) => {
    e.preventDefault();
    formData.set("id", user?.data?.CredentailsData?.id);
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
    formData.set("Library", Librarystatus);
    formData.set("Transport", TransportStatus);
    formData.set("FrontOffice", frontofficeStatus);
    formData.set("hostel", HostelStatus);
    formData.set("profileurl", user?.data?.CredentailsData?.profileurl);
    formData.set(
      "certificatelogo",
      user?.data?.CredentailsData?.certificatelogo
    );
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
      setHostelStatus(user?.data?.CredentailsData?.hostel);
      setTransportStatus(user?.data?.CredentailsData?.Transport);
      setLibrarystatus(user?.data?.CredentailsData?.Library);
      setfrontofficeStatus(user?.data?.CredentailsData?.FrontOffice);
    }
  }, []);

  console.log("checkbox data is ", Librarystatus);

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
        <h1>Show Or Hide These Options</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className="optionsdiv">
              <input
                type="checkbox"
                value={frontofficeStatus}
                checked={frontofficeStatus}
                name="frontofficeStatus"
                onChange={(e) => {
                  setfrontofficeStatus(e.target.checked);
                }}
              />
              <label>FrontOffice</label>
            </div>
            <div className="optionsdiv">
              <input
                type="checkbox"
                value={Librarystatus}
                checked={Librarystatus}
                name="Librarystatus"
                onChange={(e) => {
                  setLibrarystatus(e.target.checked);
                }}
              />
              <label>Library</label>
            </div>

            <div className="optionsdiv">
              <input
                type="checkbox"
                value={HostelStatus}
                checked={HostelStatus}
                name="HostelStatus"
                onChange={(e) => {
                  setHostelStatus(e.target.checked);
                }}
              />
              <label>Hostel</label>
            </div>

            <div className="optionsdiv">
              <input
                type="checkbox"
                value={TransportStatus}
                checked={TransportStatus}
                name="TransportStatus"
                onChange={(e) => {
                  setTransportStatus(e.target.checked);
                }}
              />
              <label>Transport</label>
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

export default DisableOptions;
