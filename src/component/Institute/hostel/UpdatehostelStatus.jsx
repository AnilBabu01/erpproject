import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Updatestudent } from "../../../redux/actions/commanAction";
import { useRouter } from "next/router";
import { ADD_STUDENT_RESET } from "../../../redux/constants/commanConstants";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
const formData = new FormData();
const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];
function UpdatehostelStatus({ setOpen, updatedata }) {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const [loading1, setloading1] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [sessionname, setsessionname] = useState("");
  const [sectionname, setsectionname] = useState("NONE");
  const [sectionlist, setsectionlist] = useState([]);
  const [TransportFeePermonth, setTransportFeePermonth] = useState("");
  const [fromroute, setfromroute] = useState("");
  const [toroute, settoroute] = useState("");
  const [amount, setamount] = useState("");
  const [monthlyfee, setmonthlyfee] = useState("");
  const [noofMonth, setnoofMonth] = useState("");
  const [onlyshowmonthfee, setonlyshowmonthfee] = useState("");
  const [onlyshowrefee, setonlyshowrefee] = useState("");
  const [annualfee, setannualfee] = useState("");
  const [hostelManualFee, sethostelManualFee] = useState("default");
  const [TransportManualFee, setTransportManualFee] = useState("default");
  const [onlyHostelFee, setonlyHostelFee] = useState("");
  const [onlyTransport, setonlyTransport] = useState("");
  const [getfee, setgetfee] = useState("default");
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const [courses, setcourses] = useState("");
  const [batchname, setbatchname] = useState("");
  const [studentname, setstudentname] = useState("");
  const [studentemail, setstudentemail] = useState("");
  const [studentphone, setstudentphone] = useState("");
  const [adminssiondate, setadminssiondate] = useState("");
  const [whatsaapnumber, setwhatsaapnumber] = useState("");
  const [usepreview, setusepreview] = useState(false);
  const [hostal, sethostal] = useState(false);
  const [transport, settransport] = useState(false);
  const [Library, setLibrary] = useState(false);
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [Pincode, setPincode] = useState("");
  const [photo, setphoto] = useState("");
  const [adharcard, setadharcard] = useState("");
  const [marksheet, setmarksheet] = useState("");
  const [pano, setpano] = useState("");
  const [adharcardno, setadharcardno] = useState("");
  const [fathersname, setfathersname] = useState("");
  const [fathersphone, setfathersphone] = useState("");
  const [studentrollno, setstudentrollno] = useState("");
  const [preview1, setpreview1] = useState("");
  const [preview2, setpreview2] = useState("");
  const [preview3, setpreview3] = useState("");
  const [birth, setbirth] = useState("");
  const [birthcerpreview, setbirthcerpreview] = useState("");
  const [others, setothers] = useState("");
  const [otherspreview, setotherspreview] = useState("");
  const [othersname, setothersname] = useState("");
  const [status, setstatus] = useState("Active");
  const [marksheetName, setmarksheetName] = useState("");
  const [shownext, setshownext] = useState(true);
  const [categoryname, setcategoryname] = useState("Please Select");
  const [categorylist, setcategorylist] = useState([]);
  const [showdownload, setshowdownload] = useState(false);
  const [hostelfeeperMonth, sethostelfeeperMonth] = useState("");
  const [hostenname, sethostenname] = useState("");
  const [hostelcategory, sethostelcategory] = useState("");
  const [hostelfacility, sethostelfacility] = useState("");
  const [hostellist, sethostellist] = useState([]);
  const [hostelcategorylist, sethostelcategorylist] = useState([]);
  const [hostelfacilitylist, sethostelfacilitylist] = useState([]);
  const [routelist, setroutelist] = useState([]);
  const { fee } = useSelector((state) => state.getfee);
  const { batch } = useSelector((state) => state.getbatch);
  const { user } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.getcategory);
  const { hostel } = useSelector((state) => state.GetHostel);
  const { roomcategory } = useSelector((state) => state.GetCategory);
  const { roomfacility } = useSelector((state) => state.GetFacility);
  const { route } = useSelector((state) => state.GetRoute);
  const { sections } = useSelector((state) => state.GetSection);
  const { studentaddstatus, student } = useSelector(
    (state) => state.addstudent
  );
  const { loading } = useSelector((state) => state.editstudent);
  const submit = () => {
    formData.set("id", updatedata?.id);
    formData.set("name", studentname);
    formData.set("email", studentemail);
    formData.set("phoneno1", studentphone);
    formData.set("city", city);
    formData.set("state", state);
    formData.set("pincode", Pincode);
    formData.set("profileurl", photo);
    formData.set("adharcard", adharcard);
    formData.set("fathersPhoneNo", fathersphone);
    formData.set("fathersName", fathersname);
    formData.set("courseorclass", courses);
    formData.set("rollnumber", studentrollno);
    formData.set("StudentStatus", adminssiondate);
    formData.set("batch", batchname);
    formData.set("admissionDate", adminssiondate);
    formData.set("regisgrationfee", amount);
    formData.set("courseduration", noofMonth);
    formData.set("markSheet", marksheet);
    formData.set("adharno", adharcardno);
    formData.set("pancardnno", pano);
    formData.set("whatsappNo", usepreview ? fathersphone : whatsaapnumber);
    formData.set("markSheetname", marksheetName);
    formData.set("othersdoc", others);
    formData.set("othersdocName", othersname);
    formData.set("BirthDocument", birth);
    formData.set("Status", status);
    formData.set("Transport", transport);
    formData.set("Library", Library);
    formData.set("hostal", hostal);
    formData.set("Section", sectionname);
    formData.set("Session", sessionname);
    formData.set("StudentCategory", categoryname);
    formData.set("AnnualFee", annualfee);
    formData.set("hostelstatus", hostal === true ? false : true);
    formData.set("transportstatus", transport === true ? false : true);
    formData.set(
      "HostelPerMonthFee",
      hostal === true
        ? hostelManualFee === "manual"
          ? Number(onlyHostelFee)
          : Number(hostelfeeperMonth)
        : 0
    );
    formData.set(
      "TotalHostelFee",
      hostal === true
        ? hostelManualFee === "manual"
          ? Number(onlyHostelFee) * 12
          : Number(hostelfeeperMonth) * 12
        : 0
    );
    formData.set(
      "TransportPerMonthFee",
      transport === true
        ? TransportManualFee === "manual"
          ? Number(onlyTransport)
          : Number(TransportFeePermonth)
        : 0
    );
    formData.set(
      "TransportTotalHostelFee",
      transport === true
        ? TransportManualFee === "manual"
          ? Number(onlyTransport) * 12
          : Number(TransportFeePermonth) * 12
        : 0
    );
    formData.set(
      "permonthfee",
      getfee === "default" ? Number(onlyshowmonthfee) : Number(monthlyfee)
    );
    formData.set(
      "studentTotalFee",
      getfee === "default"
        ? Number(onlyshowmonthfee) * 12
        : Number(monthlyfee) * 12
    );
    formData.set(
      "Studentpassword",
      user?.data[0]?.Studentpassword
        ? user?.data[0]?.Studentpassword
        : "student"
    );
    formData.set(
      "Parentpassword",
      user?.data[0]?.Parentpassword ? user?.data[0]?.Parentpassword : "parent"
    );

    dispatch(Updatestudent(formData, setOpen));
  };

  useEffect(() => {
    if (fee) {
      setisData(fee);
    }
    if (batch) {
      setbatchs(batch);
    }
    if (category) {
      setcategorylist(category);
    }
    if (hostel) {
      sethostellist(hostel);
    }
    if (roomcategory) {
      sethostelcategorylist(roomcategory);
    }
    if (roomfacility) {
      sethostelfacilitylist(roomfacility);
    }
    if (route) {
      setroutelist(route);
    }
    if (sections) {
      setsectionlist(sections);
    }
  }, [
    fee,
    batch,
    category,
    roomcategory,
    roomfacility,
    hostel,
    route,
    sections,
  ]);

  const gotoreceipt = () => {
    navigation.push({
      pathname: "/coaching/accounts/collectfee",
      query: {
        receiptdata: JSON.stringify(student?.data[0]?.user),
      },
    });
  };
  useEffect(() => {
    if (updatedata) {
      setstudentrollno(updatedata?.rollnumber);
      setstudentemail(updatedata?.email);
      setstudentname(updatedata?.name);
      setstudentphone(updatedata?.phoneno1);
      setfathersname(updatedata?.fathersName);
      setfathersphone(updatedata?.fathersPhoneNo);
      setpano(updatedata?.pancardnno);
      setadharcardno(updatedata?.adharno);
      setstate(updatedata?.state);
      setcity(updatedata?.city);
      setstate(updatedata?.state);
      setbatchname(updatedata?.batch);
      setcourses(updatedata?.courseorclass);
      setadminssiondate(
        new Date(updatedata?.admissionDate).toISOString().substring(0, 10)
      );
      setPincode(updatedata?.pincode);
      setwhatsaapnumber(updatedata?.whatsappNo);
      setothersname(updatedata?.othersdocName);
      setmarksheetName(updatedata?.markSheetname);
      setbirth(updatedata?.BirthDocument);
      setmarksheet(updatedata?.markSheet);
      setadharcard(updatedata?.adharno);
      setothers(updatedata?.othersdoc);
      setphoto(updatedata?.profileurl);
      setstatus(updatedata?.Status);
      setnoofMonth(updatedata?.courseduration);
      setamount(updatedata?.regisgrationfee);
      setmonthlyfee(updatedata?.permonthfee);
      setonlyshowmonthfee(updatedata?.permonthfee);
      setonlyshowrefee(updatedata?.regisgrationfee);
      settransport(updatedata?.Transport);
      setLibrary(updatedata?.Library);
      sethostal(updatedata?.hostal);
      setcategoryname(updatedata?.StudentCategory);
      setTransportFeePermonth(updatedata?.TransportPerMonthFee);
      sethostelfeeperMonth(updatedata?.HostelPerMonthFee);
      setannualfee(updatedata?.AnnualFee);
      setsessionname(updatedata?.Session);
      setsectionname(updatedata?.Section);
      sethostelfacility(updatedata?.Facility);
      sethostenname(updatedata?.hostelname);
      sethostelcategory(updatedata?.Category);
    }
  }, []);

  const gethostelFee = () => {
    try {
      setloading1(true);
      serverInstance("hostel/gethostelfee", "post", {
        hostelname: hostenname,
        Category: hostelcategory,
        Facility: hostelfacility,
      }).then((res) => {
        if (res?.status === true) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          setloading1(false);
          sethostelfeeperMonth(res?.data?.PermonthFee);
          setonlyHostelFee(res?.data?.PermonthFee);
        }
      });
    } catch (error) {
      setloading1(false);
    }
  };

  const gettransportFee = () => {
    try {
      setloading2(true);
      serverInstance("transport/gettransportfee", "post", {
        FromRoute: fromroute,
        ToRoute: toroute,
      }).then((res) => {
        if (res?.status === true) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          setloading2(false);
          // console.log(res?.data);
          setTransportFeePermonth(res?.data?.BusRentPermonth);
          setonlyTransport(res?.data?.BusRentPermonth);
        }
      });
    } catch (error) {
      setloading2(false);
    }
  };

  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Add Student To Hostel</h1>

        <div className={styles.inputdiv}>
          <label>Hostal</label>
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
            value={hostal}
            name="hostal"
            onChange={(e) => sethostal(e.target.value)}
            displayEmpty
          >
            <MenuItem
              sx={{
                fontSize: 14,
              }}
              value={false}
            >
              No
            </MenuItem>
            <MenuItem
              sx={{
                fontSize: 14,
              }}
              value={true}
            >
              Yes
            </MenuItem>
          </Select>
        </div>
        {hostal === true && (
          <>
            <label>Hostel Details</label>
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
                  value={hostenname}
                  name="hostenname"
                  onChange={(e) => sethostenname(e.target.value)}
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
                  {hostellist?.length > 0 &&
                    hostellist?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.HostelName}
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
                  value={hostelcategory}
                  name="hostelcategory"
                  onChange={(e) => sethostelcategory(e.target.value)}
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
                  {hostelcategorylist?.length > 0 &&
                    hostelcategorylist?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.roomCategory}
                        >
                          {item?.roomCategory}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>
              <div className={styles.inputdiv}>
                <label>Facility</label>
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
                  value={hostelfacility}
                  name="hostelfacility"
                  onChange={(e) => sethostelfacility(e.target.value)}
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
                  {hostelfacilitylist?.length > 0 &&
                    hostelfacilitylist?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.roomFacility}
                        >
                          {item?.roomFacility}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>
            </div>
            <input
              type="radio"
              name="hostelManualFee"
              value="default"
              checked={hostelManualFee === "default"}
              onChange={(e) => sethostelManualFee(e.target.value)}
            />
            <label>Default Fee Structure</label>

            <div className={styles.divmaininput}>
              <div className={styles.inputdiv}>
                <label>Monthly Hostel Fee</label>
                <input
                  required
                  disabled={true}
                  type="text"
                  placeholder="Amount"
                  value={hostelfeeperMonth}
                />
              </div>
              <div className={styles.inputdiv}>
                <label>Total Hostel Fee</label>
                <input
                  required
                  type="text"
                  disabled={true}
                  value={Number(hostelfeeperMonth) * 12}
                />
              </div>
              <div className={styles.inputdiv}>
                <label>&nbsp;</label>
                <button
                  disabled={loading ? true : false}
                  className={styles.logbtnstyle}
                  onClick={() => gethostelFee()}
                >
                  {loading1 ? (
                    <CircularProgress size={25} style={{ color: "red" }} />
                  ) : (
                    "Get Hostel Fee"
                  )}
                </button>
              </div>
            </div>
            <input
              type="radio"
              name="hostelManualFee"
              value="manual"
              checked={hostelManualFee === "manual"}
              onChange={(e) => sethostelManualFee(e.target.value)}
            />
            <label>Manual Fee Structure</label>
            {hostelManualFee === "manual" && (
              <>
                <div className={styles.divmaininput}>
                  <div className={styles.inputdiv}>
                    <label>Monthly Hostel Fee</label>
                    <input
                      required
                      type="text"
                      placeholder="Amount"
                      value={onlyHostelFee}
                      onChange={(e) => setonlyHostelFee(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>Total Hostel Fee</label>
                    <input
                      required
                      type="text"
                      disabled={true}
                      value={Number(onlyHostelFee) * 12}
                    />
                  </div>
                  <div className={styles.inputdiv}>
                    <label>&nbsp;</label>
                    <label>&nbsp;</label>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <div className={styles.mainbtnndivcancel}>
          <button
            onClick={() => setshownext(true)}
            className={styles.cancelbtn}
          >
            Back
          </button>

          <button
            disabled={loading ? true : false}
            className={styles.cancelbtn}
            onClick={() => submit()}
          >
            {loading ? (
              <CircularProgress size={25} style={{ color: "red" }} />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdatehostelStatus;
