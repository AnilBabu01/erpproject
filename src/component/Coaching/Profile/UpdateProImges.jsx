import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { UpdateProfile } from "../../../redux/actions/coachingAction";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/authActions";
import { UPDATE_RESET_PROFILE_SUCCESS } from "../../../redux/constants/coachingContants";
import { backendUrl } from "../../../config/config";
const formData = new FormData();
function UpdateProImges({ setOpen }) {
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
  const [profileimg, setprofileimg] = useState("");
  const [logoimg, setlogoimg] = useState("");
  const [certificateimg, setcertificateimg] = useState("");
  const [previewprofile1, setpreviewprofile1] = useState("");
  const [previewprofile2, setpreviewprofile2] = useState("");
  const [previewprofile3, setpreviewprofile3] = useState("");
  const { isUpdated } = useSelector((state) => state.editprofile);
  const { user } = useSelector((state) => state.auth);

  console.log(profileimg);
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
    formData.set("profileurl", profileimg);
    formData.set("certificatelogo", certificateimg);
    formData.set("logourl", logoimg);
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
      setsendemailpassword(user?.data[0]?.SendemailPassword);
      setsendemail(user?.data[0]?.Sendemail);
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
        <h1>Update Profile Img / Logo</h1>
        <form onSubmit={submit}>
          <div className={styles.divmaininput}>
            <div className={[styles.inputdiv]}>
              <label>Profile Image</label>
              <input
                type="file"
                onChange={(e) => {
                  setprofileimg(e.target.files[0]);

                  setpreviewprofile1(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Profile</p>
                {previewprofile1 ? (
                  <>
                    <div className="main_img_divvvv">
                      <img
                        alt="img"
                        className="dharamshala_imgggg"
                        src={previewprofile1}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {user?.data[0]?.profileurl ? (
                      <>
                        <img
                          className="keydetailsdivproimg"
                          src={`${backendUrl}public/upload/${user?.data[0]?.profileurl}`}
                          alt="Logo"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          alt="img"
                          className="keydetailsdivproimg"
                          src="/images/profileimg.jpg"
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className={[styles.inputdiv]}>
              <label>Certificate Logo</label>
              <input
                type="file"
                onChange={(e) => {
                  setcertificateimg(e.target.files[0]);
                  setpreviewprofile2(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Certificate Logo</p>
                {previewprofile2 ? (
                  <>
                    <div className="main_img_divvvv">
                      <img
                        alt="img"
                        className="dharamshala_imgggg"
                        src={previewprofile2}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {user?.data[0]?.certificatelogo ? (
                      <>
                        <img
                          className="keydetailsdivcertificatelogoimg"
                          src={`${backendUrl}public/upload/${user?.data[0]?.certificatelogo}`}
                          alt="Logo"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          alt="img"
                          className="keydetailsdivcertificatelogoimg"
                          src="/images/erp.jpeg"
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className={[styles.inputdiv]}>
              <label>Logo</label>
              <input
                type="file"
                onChange={(e) => {
                  setlogoimg(e.target.files[0]);
                  setpreviewprofile3(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <div className="keydetailsdiv">
                <p className="keydetailsdivp">Logo</p>

                {previewprofile3 ? (
                  <>
                    <div className="main_img_divvvv">
                      <img
                        alt="img"
                        className="dharamshala_imgggg"
                        src={previewprofile3}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {user?.data[0]?.logourl ? (
                      <>
                        <img
                          className="keydetailsdivlogoimg"
                          src={`${backendUrl}public/upload/${user?.data[0]?.logourl}`}
                          alt="Logo"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          alt="img"
                          className="keydetailsdivlogoimg"
                          src="/images/erp.jpeg"
                        />
                      </>
                    )}
                  </>
                )}
              </div>
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

export default UpdateProImges;
