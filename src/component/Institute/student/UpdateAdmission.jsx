import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Updatestudent } from "../../../redux/actions/commanAction";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import moment from "moment";
import Select1 from "react-select";
import { indiaStatesData } from "../../Auth/StaticData";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    borderColor: "#9e9e9e",
    // height: "30px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    // height: "30px",
    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};
const formData = new FormData();

const studentStatus = [
  { label: "Active", value: "Active" },
  { label: "On Leave", value: "On Leave" },
  { label: "Left In Middle", value: "Left In Middle" },
  { label: "Completed", value: "Completed" },
  { label: "Unknown", value: "Unknown" },
];

const CasteList = [
  { label: "General", value: "General" },
  { label: "OBC", value: "OBC" },
  { label: "SC", value: "SC" },
  { label: "ST", value: "ST" },
  { label: "Others", value: "Others" },
];

const BloodGroupList = [
  { label: "(A+)", value: "(A+)" },
  { label: "(A-)", value: "(A-)" },
  { label: "(B+)", value: "(B+)" },
  { label: "(B-)", value: "(B-)" },
  { label: "(O+)", value: "(O+)" },
  { label: "(O-)", value: "(O-)" },
  { label: "(AB+)", value: "(AB+)" },
  { label: "(AB-)", value: "(AB-)" },
  {
    label: "Under Investigation OR N.A.",
    value: "Under Investigation OR N.A.",
  },
];

const religionList = [
  { label: "Hinduism", value: "Hinduism" },
  { label: "Muslim", value: "Muslim" },
  { label: "Sikhism", value: "Sikhism" },
  { label: "Buddhism", value: "Buddhism" },
  { label: "Jainism", value: "Jainism" },
  { label: "Christianity", value: "Christianity" },
  { label: "Others", value: "Others" },
];

const GenderListList = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Others", value: "Others" },
];

function UpdateAdmission({ setOpen, updatedata }) {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const [admissionFee, setadmissionFee] = useState("");
  const [annualfee, setannualfee] = useState("");
  const [manualAdmissionFee, setmanualAdmissionFee] = useState("");
  const [manualAnnualFee, setmanualAnnualFee] = useState("");
  const [Religion, setReligion] = useState("");
  const [Nationality, setNationality] = useState("Indian");
  const [address, setaddress] = useState("");
  const [gender, setgender] = useState("Male");
  const [BloodGroup, setBloodGroup] = useState("");
  const [stream, setstream] = useState("NONE");
  const [loading1, setloading1] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [SrNumber, setSrNumber] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
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

  const [mothersname, setmotherssname] = useState("");
  const [mothersphone, setmotherssphone] = useState("");
  const [whatsaapmothersnumber, setwhatsaapmothersnumber] = useState("");
  const [mothersusepreview, setmothersusepreview] = useState(false);

  const [PreviousTcNo, setPreviousTcNo] = useState("");
  const [PreviousSchool, setPreviousSchool] = useState("");
  const [PreviousSchoolAddress, setPreviousSchoolAddress] = useState("");

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
  const [sessionList, setsessionList] = useState([]);
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
  const { Sessions } = useSelector((state) => state.GetSession);
  const submit = () => {
    formData.set("id", updatedata?.id);
    formData.set("name", studentname);
    formData.set("email", studentemail);
    formData.set("phoneno1", studentphone);
    formData.set("Religion", Religion);
    formData.set("Nationality", Nationality);
    formData.set("Gender", gender);
    formData.set("BloodGroup", BloodGroup);
    formData.set("address", address);
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
    formData.set("PEN", pano);
    formData.set("DateOfBirth", DateOfBirth);
    formData.set("whatsappNo", usepreview ? fathersphone : whatsaapnumber);

    formData.set("MathersName", mothersname);
    formData.set("MathersPhoneNo", mothersphone);
    formData.set(
      "MatherswhatsappNo",
      mothersusepreview ? mothersphone : whatsaapmothersnumber
    );

    formData.set("PreviousTcNo", PreviousTcNo);
    formData.set("PreviousSchoolName", PreviousSchool);
    formData.set("PreviousSchoolAddress", PreviousSchoolAddress);

    formData.set("markSheetname", marksheetName);
    formData.set("othersdoc", others);
    formData.set("othersdocName", othersname);
    formData.set("BirthDocument", birth);
    formData.set("Status", status);
    formData.set("Transport", transport);
    formData.set("Library", Library);
    formData.set("hostal", hostal);
    formData.set("FromRoute", "");
    formData.set("ToRoute", "");
    formData.set("BusNumber", "");
    formData.set("Section", sectionname);
    formData.set("Session", sessionname);
    formData.set("StudentCategory", categoryname);

    formData.set("stream", stream);
    formData.set("hostelstatus", hostal === true ? false : true);
    formData.set("transportstatus", transport === true ? false : true);
    formData.set(
      "admissionfee",
      getfee === "default" ? Number(admissionFee) : Number(manualAdmissionFee)
    );
    formData.set(
      "AnnualFee",
      getfee === "default" ? Number(annualfee) : Number(manualAnnualFee)
    );
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
    // formData.set(
    //   "Studentpassword",
    //   user?.data[0]?.Studentpassword
    //     ? user?.data[0]?.Studentpassword
    //     : "student"
    // );
    // formData.set(
    //   "Parentpassword",
    //   user?.data[0]?.Parentpassword ? user?.data[0]?.Parentpassword : "parent"
    // );

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
    if (Sessions) {
      setsessionList(Sessions);
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
    Sessions,
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
        moment(updatedata?.admissionDate?.substring(0, 10)).format("YYYY-MM-DD")
      );
      setDateOfBirth(
        moment(updatedata?.DateOfBirth?.substring(0, 10)).format("YYYY-MM-DD")
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
      setTransportFeePermonth(updatedata?.TransportPerMonthFee);
      sethostelfeeperMonth(updatedata?.HostelPerMonthFee);
      setannualfee(updatedata?.AnnualFee);
      setsessionname(updatedata?.Session);
      setsectionname(updatedata?.Section);
      sethostelfacility(updatedata?.Facility);
      sethostenname(updatedata?.hostelname);
      sethostelcategory(updatedata?.Category);
      setfromroute(updatedata?.FromRoute);
      settoroute(updatedata?.ToRoute);
      setpano(updatedata?.pancardnno);
      setadmissionFee(updatedata?.admissionfee);
      setmanualAdmissionFee(updatedata?.admissionfee);
      setmanualAnnualFee(updatedata?.AnnualFee);
      setcategoryname(updatedata?.StudentCategory);
      setstream(updatedata?.Stream);
      setgender(updatedata?.Gender);
      setaddress(updatedata?.address);
      setBloodGroup(updatedata?.BloodGroup);
      setwhatsaapmothersnumber(updatedata?.MatherswhatsappNo);
      setmotherssphone(updatedata?.MathersPhoneNo);
      setmotherssname(updatedata?.MathersName);
      setPreviousSchool(updatedata?.PreviousSchoolName);
      setPreviousSchoolAddress(updatedata?.PreviousSchoolAddress);
      setPreviousTcNo(updatedata?.PreviousTcNo);
      setNationality(updatedata?.Nationality);
      setReligion(updatedata?.Religion);
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
        <h1>
          {shownext ? "Update Student" : showdownload ? "" : "Fee Structure"}
        </h1>
        <div>
          {shownext ? (
            <>
              <div className={styles.divmaininput}>
                <div className={styles.inputdiv}>
                  <label>Admission Date</label>
                  <input
                    required
                    type="date"
                    value={adminssiondate}
                    name="adminssiondate"
                    onChange={(e) => setadminssiondate(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Category</label>
                  <Select
                    required
                    className={styles.addwidth}
                    sx={{
                      width: "18rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={categoryname}
                    name="categoryname"
                    onChange={(e) => setcategoryname(e.target.value)}
                    // displayEmpty
                  >
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      value={"Please Select"}
                    >
                      Please Select
                    </MenuItem>
                    {CasteList?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.value}
                        >
                          {item?.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
                <div className={styles.inputdiv}>
                  <label>Date Of Birth</label>
                  <input
                    required
                    type="date"
                    value={DateOfBirth}
                    name="DateOfBirth"
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.divmaininput}>
                <div className={styles.inputdiv}>
                  <label>Roll Number</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Roll Number"
                    value={studentrollno}
                    name="studentrollno"
                    onChange={(e) => setstudentrollno(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Sr Number</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter St Number"
                    value={SrNumber}
                    name="SrNumber"
                    onChange={(e) => setSrNumber(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Session</label>

                  <Select
                    required
                    className={styles.addwidth}
                    sx={{
                      width: "18rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={sessionname}
                    name="sessionname"
                    onChange={(e) => setsessionname(e.target.value)}
                    // displayEmpty
                  >
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      value={"Please Select"}
                    >
                      Please Select
                    </MenuItem>
                    {sessionList?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.Session}
                        >
                          {item?.Session}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className={styles.divmaininput}>
                <div className={styles.inputdiv}>
                  <label>Student Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter The name"
                    value={studentname}
                    name="studentname"
                    onChange={(e) => setstudentname(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Student Phone No</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Phone No"
                    value={studentphone}
                    name="studentphone"
                    onChange={(e) => setstudentphone(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Student Email</label>
                  <input
                    required
                    type="email"
                    placeholder="Enter the Student Email"
                    value={studentemail}
                    name="studentemail"
                    onChange={(e) => setstudentemail(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.divmaininput}>
                <div className={styles.inputdiv}>
                  <label>PEN (Permanent Education No.)</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the PEN"
                    value={pano}
                    name="pano"
                    onChange={(e) => setpano(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Aadhar Card No</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Aadhar Card No"
                    value={adharcardno}
                    name="adharcardno"
                    onChange={(e) => setadharcardno(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Section</label>
                  <Select
                    required
                    className={styles.addwidth}
                    sx={{
                      width: "18rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={sectionname}
                    name="sectionname"
                    onChange={(e) => setsectionname(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      value={"NONE"}
                    >
                      NONE
                    </MenuItem>
                    {sectionlist?.length > 0 &&
                      sectionlist?.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            sx={{
                              fontSize: 14,
                            }}
                            value={item?.section}
                          >
                            {item?.section}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </div>
              </div>
              <div className={styles.divmaininput}>
                <div className={styles.inputdiv}>
                  <label>Gender</label>
                  <Select
                    required
                    className={styles.addwidth}
                    sx={{
                      width: "18rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={gender}
                    name="gender"
                    onChange={(e) => setgender(e.target.value)}
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

                    {GenderListList?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.value}
                        >
                          {item?.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>

                <div className={styles.inputdiv}>
                  <label>Blood Group</label>
                  <Select
                    required
                    className={styles.addwidth}
                    sx={{
                      width: "18rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={BloodGroup}
                    name="BloodGroup"
                    onChange={(e) => setBloodGroup(e.target.value)}
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

                    {BloodGroupList?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.value}
                        >
                          {item?.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>

                <div className={styles.inputdiv}>
                  <label>Religion</label>
                  <Select
                    required
                    className={styles.addwidth}
                    sx={{
                      width: "18rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={Religion}
                    name="Religion"
                    onChange={(e) => setReligion(e.target.value)}
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

                    {religionList?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.value}
                        >
                          {item?.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              </div>

              <div className={styles.divmaininput}>
                <div className={styles.selectdiv10}>
                  <label>State</label>

                  <Select1
                    required
                    styles={customStyles}
                    options={indiaStatesData?.states?.map((item) => ({
                      label: item?.state,
                      value: item?.id,
                    }))}
                    onChange={(opt) => setstate(opt.value)}
                  />
                </div>
                <div className={styles.selectdiv10}>
                  <label>District</label>

                  <Select1
                    required
                    styles={customStyles}
                    options={indiaStatesData?.states
                      ?.find((item) => item?.id === Number(state))
                      ?.districts?.map((item) => ({
                        label: item?.name,
                        value: item?.name,
                      }))}
                    onChange={(opt) => setcity(opt.value)}
                  />
                </div>

                <div className={styles.inputdiv}>
                  <label>Pin Code</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Pincode"
                    value={Pincode}
                    name="Pincode"
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.divmaininput10}>
                <div className={styles.mainaddresdiv}>
                  <label>Address</label>
                  <input
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Nationality</label>
                  <input
                    placeholder="Enter Nationality"
                    value={Nationality}
                    onChange={(e) => setNationality(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.divmaininput}>
                <div className={styles.inputdiv}>
                  <label>Fathers Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Father's Name"
                    value={fathersname}
                    name="fathersname"
                    onChange={(e) => setfathersname(e.target.value)}
                  />
                </div>

                <div className={styles.inputdiv}>
                  <label>Fathers Phone No</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Phone No"
                    value={fathersphone}
                    name="fathersphone"
                    onChange={(e) => setfathersphone(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>
                    <input
                      className={styles.checkpreview}
                      value={true}
                      onChange={(e) => setusepreview(e.target.checked)}
                      type="checkbox"
                    />
                    WhatsApp Use Previous
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Whatsapp No"
                    value={usepreview ? fathersphone : whatsaapnumber}
                    name="whatsaapnumber"
                    onChange={(e) =>
                      setwhatsaapnumber(
                        usepreview ? fathersphone : e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className={styles.divmaininput}>
                <div className={styles.inputdiv}>
                  <label>Mothers Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Mother's Name"
                    value={mothersname}
                    name="mothersname"
                    onChange={(e) => setmotherssname(e.target.value)}
                  />
                </div>

                <div className={styles.inputdiv}>
                  <label>Mothers Phone No</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Phone No"
                    value={mothersphone}
                    name="mothersphone"
                    onChange={(e) => setmotherssphone(e.target.value)}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>
                    <input
                      className={styles.checkpreview}
                      value={true}
                      onChange={(e) => setmothersusepreview(e.target.checked)}
                      type="checkbox"
                    />
                    WhatsApp Use Previous
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter the Whatsapp No"
                    value={
                      mothersusepreview ? mothersphone : whatsaapmothersnumber
                    }
                    name="whatsaapnumber"
                    onChange={(e) =>
                      setwhatsaapmothersnumber(
                        mothersusepreview ? mothersphone : e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div className={styles.divmaininput}>
                <div className={styles.inputdiv}>
                  <label>Password Size Photo (250KB)</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const maxFileSize = 20 * 1024 * 1024; // 5 MB in bytes
                      console.log("file size", file.size, maxFileSize);
                      if (file && file.size > maxFileSize) {
                        alert("File size exceeds the limit of 5 MB.");
                        e.target.value = ""; // Clear the file input

                        setphoto(e.target.files[0]);

                        return;
                      } else {
                        setphoto(file);
                        setpreview1(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Adhar Card</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const maxFileSize = 20 * 1024 * 1024; // 5 MB in bytes

                      if (file && file.size > maxFileSize) {
                        alert("File size exceeds the limit of 5 MB.");
                        e.target.value = ""; // Clear the file input
                        setadharcard(e.target.files[0]);

                        return;
                      } else {
                        setadharcard(file);
                        setpreview2(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>
                <div className={styles.inputdiv}>
                  <label>Previous Year MarkSheet</label>
                  <span className={styles.documentnameDiv}>
                    <input
                      className={styles.hlfsize}
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const maxFileSize = 20 * 1024 * 1024; // 5 MB in bytes

                        if (file && file.size > maxFileSize) {
                          alert("File size exceeds the limit of 5 MB.");
                          e.target.value = ""; // Clear the file input
                          setmarksheet(e.target.files[0]);

                          return;
                        } else {
                          setmarksheet(file);
                          setpreview3(URL.createObjectURL(file));

                          console.log("marksheet", file);
                        }
                      }}
                    />
                    <input
                      className={styles.hlfsize}
                      required
                      type="text"
                      placeholder="Doc Name"
                      value={marksheetName}
                      name="marksheetName"
                      onChange={(e) => setmarksheetName(e.target.value)}
                    />
                  </span>
                </div>
              </div>

              <div className={styles.divmaininput}>
                <div className={styles.inputdiv}>
                  <label>Birth Certificate</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const maxFileSize = 20 * 1024 * 1024; // 5 MB in bytes
                      console.log("file size", file.size, maxFileSize);
                      if (file && file.size > maxFileSize) {
                        alert("File size exceeds the limit of 5 MB.");
                        e.target.value = ""; // Clear the file input

                        setbirth(e.target.files[0]);

                        return;
                      } else {
                        setbirth(file);
                        setbirthcerpreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>

                <div className={styles.inputdiv}>
                  <label>Others</label>
                  <span className={styles.documentnameDiv}>
                    <input
                      className={styles.hlfsize}
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const maxFileSize = 20 * 1024 * 1024; // 5 MB in bytes

                        if (file && file.size > maxFileSize) {
                          alert("File size exceeds the limit of 5 MB.");
                          e.target.value = ""; // Clear the file input
                          setothers(e.target.files[0]);

                          return;
                        } else {
                          setothers(file);
                          setotherspreview(URL.createObjectURL(file));

                          console.log("marksheet", file);
                        }
                      }}
                    />
                    <input
                      className={styles.hlfsize}
                      required
                      type="text"
                      placeholder="Doc Name"
                      value={othersname}
                      name="othersname"
                      onChange={(e) => setothersname(e.target.value)}
                    />
                  </span>
                </div>
                <div className={styles.inputdiv}>
                  <label>Student Status</label>
                  <Select
                    required
                    className={styles.addwidth}
                    sx={{
                      width: "18.2rem",
                      fontSize: 14,
                      "& .MuiSelect-select": {
                        paddingTop: "0.6rem",
                        paddingBottom: "0.6em",
                      },
                    }}
                    value={status}
                    name="status"
                    onChange={(e) => setstatus(e.target.value)}
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
                    {studentStatus?.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          sx={{
                            fontSize: 14,
                          }}
                          value={item?.value}
                        >
                          {item?.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              </div>

              {preview1 && (
                <>
                  <div className={styles.inputdivimg}>
                    <label>Passport Size Photo</label>
                    <img
                      className="keydetailsdivproimg"
                      src={preview1}
                      alt="imgdd"
                    />
                  </div>
                </>
              )}

              {preview2 && (
                <>
                  <div className={styles.inputdivimg10}>
                    <label>Adhar Card</label>
                    <img
                      className="keydetailsdivlogoimg10"
                      src={preview2}
                      alt="imgdd"
                    />
                  </div>
                </>
              )}

              {preview3 && (
                <>
                  <div className={styles.inputdivimg10}>
                    <label>Marsheet</label>
                    <img
                      className="keydetailsdivlogoimg10"
                      src={preview3}
                      alt="imgdd"
                    />
                  </div>
                </>
              )}
              {birthcerpreview && (
                <>
                  <div className={styles.inputdivimg10}>
                    <label>Birth Certificate</label>
                    <img
                      className="keydetailsdivlogoimg10"
                      src={birthcerpreview}
                      alt="imgdd"
                    />
                  </div>
                </>
              )}
              {otherspreview && (
                <>
                  <div className={styles.inputdivimg10}>
                    <label>Others</label>
                    <img
                      className="keydetailsdivlogoimg10"
                      src={otherspreview}
                      alt="imgdd"
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {showdownload ? (
                <>
                  <p className={styles.completetext}>
                    Admission Completed Successfully
                  </p>
                </>
              ) : (
                <>
                  <p>Previous School Details</p>
                  <div className={styles.divmaininput}>
                    <div className={styles.inputdiv}>
                      <label>TC No</label>
                      <input
                        required
                        type="text"
                        placeholder="Enter the TC No"
                        value={PreviousTcNo}
                        name="PreviousTcNo"
                        onChange={(e) => setPreviousTcNo(e.target.value)}
                      />
                    </div>

                    <div className={styles.inputdiv}>
                      <label>Previous School Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Enter Previous School Name"
                        value={PreviousSchool}
                        name="PreviousSchool"
                        onChange={(e) => setPreviousSchool(e.target.value)}
                      />
                    </div>
                    <div className={styles.inputdiv}>
                      <label>Previous School Address</label>
                      <input
                        required
                        type="text"
                        placeholder="Enter Previous School Address"
                        value={PreviousSchoolAddress}
                        name="PreviousSchoolAddress"
                        onChange={(e) =>
                          setPreviousSchoolAddress(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.divmaininput}>
                    <div className={styles.inputdiv}>
                      <label>Class</label>
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
                        value={courses}
                        name="courses"
                        onChange={(e) => setcourses(e.target.value)}
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
                        {isdata?.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              sx={{
                                fontSize: 14,
                              }}
                              value={item?.coursename}
                              onClick={() => {
                                setamount(item?.Registractionfee);
                                setmonthlyfee(item?.feepermonth);
                                setnoofMonth(item?.courseduration);
                                setonlyshowmonthfee(item?.feepermonth);
                                setonlyshowrefee(item?.Registractionfee);
                                setadmissionFee(item?.adminssionfee);
                                setannualfee(item?.AnnualFee);
                                setmanualAdmissionFee(item?.adminssionfee);
                                setmanualAnnualFee(item?.AnnualFee);
                              }}
                            >
                              {item?.coursename}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </div>
                    <div className={styles.inputdiv}>
                      <label>Stream</label>
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
                        value={stream}
                        name="stream"
                        onChange={(e) => setstream(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={"NONE"}
                        >
                          NONE
                        </MenuItem>

                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={"Arts"}
                        >
                          Arts
                        </MenuItem>

                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={"COMMERCE"}
                        >
                          COMMERCE
                        </MenuItem>

                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={"SCIENCE"}
                        >
                          SCIENCE
                        </MenuItem>
                      </Select>
                    </div>
                  </div>
                  {courses ? (
                    <>
                      <div>
                        <input
                          type="radio"
                          name="fee"
                          value="default"
                          checked={getfee === "default"}
                          onChange={(e) => setgetfee(e.target.value)}
                        />
                        <label>Default fee Structure</label>
                        <div className={styles.divmaininput}>
                          <div className={styles.inputdiv}>
                            <label>Registration Fee</label>
                            <input
                              required
                              disabled={true}
                              type="text"
                              placeholder="Amount"
                              value={onlyshowrefee}
                            />
                          </div>
                          <div className={styles.inputdiv}>
                            <label>Monthly Fee</label>
                            <input
                              required
                              type="text"
                              disabled={true}
                              value={onlyshowmonthfee}
                            />
                          </div>
                          <div className={styles.inputdiv}>
                            <label>Annual Fee</label>
                            <input
                              required
                              type="text"
                              placeholder="Enter Annual fee"
                              value={annualfee}
                              onChange={(e) => setannualfee(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className={styles.inputdiv}>
                          <label>Admission Fee</label>
                          <input
                            required
                            type="text"
                            placeholder="Enter Admission fee"
                            value={admissionFee}
                            name="admissionFee"
                            onChange={(e) => setadmissionFee(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="fee"
                          value="manual"
                          checked={getfee === "manual"}
                          onChange={(e) => setgetfee(e.target.value)}
                        />
                        <label>Manual fee Structure</label>
                        {getfee === "manual" && (
                          <>
                            <div className={styles.divmaininput}>
                              <div className={styles.inputdiv}>
                                <label>Registration Fee</label>
                                <input
                                  required
                                  type="text"
                                  placeholder="Enter the Registration Fee"
                                  value={amount}
                                  name="amount"
                                  onChange={(e) => setamount(e.target.value)}
                                />
                              </div>
                              <div className={styles.inputdiv}>
                                <label>Monthly Fee</label>
                                <input
                                  required
                                  type="text"
                                  placeholder="Enter the Monthly Fee"
                                  value={monthlyfee}
                                  name="monthlyfee"
                                  onChange={(e) =>
                                    setmonthlyfee(e.target.value)
                                  }
                                />
                              </div>
                              <div className={styles.inputdiv}>
                                <label>Annual Fee</label>
                                <input
                                  required
                                  type="text"
                                  placeholder="Enter Annual fee"
                                  value={manualAnnualFee}
                                  name="manualAnnualFee"
                                  onChange={(e) => setmanualAnnualFee(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className={styles.inputdiv}>
                              <label>Admission Fee</label>
                              <input
                                required
                                type="text"
                                placeholder="Enter Admission fee"
                                value={manualAdmissionFee}
                                name="manualAdmissionFee"
                                onChange={(e) =>
                                  setmanualAdmissionFee(e.target.value)
                                }
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className={styles.divmaininput}>
                    <div className={styles.inputdiv}>
                      {user?.data?.CredentailsData?.hostel === true ? (
                        <>
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
                        </>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className={styles.inputdiv}>
                      {user?.data?.CredentailsData?.Transport === true ? (
                        <>
                          <label>Transport</label>
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
                            value={transport}
                            name="transport"
                            onChange={(e) => settransport(e.target.value)}
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
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className={styles.inputdiv}>
                      {user?.data?.CredentailsData?.Library === true ? (
                        <>
                          <label>Library</label>
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
                            value={Library}
                            name="Library"
                            onChange={(e) => setLibrary(e.target.value)}
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
                        </>
                      ) : (
                        ""
                      )}
                    </div>
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
                              <CircularProgress
                                size={25}
                                style={{ color: "red" }}
                              />
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
                                onChange={(e) =>
                                  setonlyHostelFee(e.target.value)
                                }
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
                  {transport === true && (
                    <>
                      <label>Transpost Details</label>
                      <div className={styles.divmaininput}>
                        <div className={styles.inputdiv}>
                          <label>From Route</label>
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
                            value={fromroute}
                            name="fromroute"
                            onChange={(e) => setfromroute(e.target.value)}
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
                            {routelist?.length > 0 &&
                              routelist?.map((item, index) => {
                                return (
                                  <MenuItem
                                    key={index}
                                    sx={{
                                      fontSize: 14,
                                    }}
                                    value={item?.routeName?.FromRoute}
                                  >
                                    {item?.routeName?.FromRoute}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </div>
                        <div className={styles.inputdiv}>
                          <label>To Route</label>
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
                            value={toroute}
                            name="toroute"
                            onChange={(e) => settoroute(e.target.value)}
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
                            {routelist?.length > 0 &&
                              routelist?.map((item, index) => {
                                return (
                                  <MenuItem
                                    key={index}
                                    sx={{
                                      fontSize: 14,
                                    }}
                                    value={item?.routeName?.ToRoute}
                                  >
                                    {item?.routeName?.ToRoute}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </div>
                        <div className={styles.inputdiv}>
                          <label>&nbsp;</label>
                          <button
                            disabled={loading ? true : false}
                            className={styles.logbtnstyle}
                            onClick={() => gettransportFee()}
                          >
                            {loading2 ? (
                              <CircularProgress
                                size={25}
                                style={{ color: "red" }}
                              />
                            ) : (
                              "Get Transport Fee"
                            )}
                          </button>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="TransportManualFee"
                        value="default"
                        checked={TransportManualFee === "default"}
                        onChange={(e) => setTransportManualFee(e.target.value)}
                      />
                      <label>Default Fee Structure</label>
                      <div className={styles.divmaininput}>
                        <div className={styles.inputdiv}>
                          <label>Monthly Transport Fee</label>
                          <input
                            required
                            disabled={true}
                            type="text"
                            placeholder="Amount"
                            value={TransportFeePermonth}
                          />
                        </div>
                        <div className={styles.inputdiv}>
                          <label>Total Transport Fee</label>
                          <input
                            required
                            type="text"
                            disabled={true}
                            value={Number(TransportFeePermonth) * 12}
                          />
                        </div>
                        <div className={styles.inputdiv}>
                          <label>&nbsp;</label>
                          <label>&nbsp;</label>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="TransportManualFee"
                        value="manual"
                        checked={TransportManualFee === "manual"}
                        onChange={(e) => setTransportManualFee(e.target.value)}
                      />
                      <label>Manaul Fee Structure</label>
                      {TransportManualFee === "manual" && (
                        <>
                          <div className={styles.divmaininput}>
                            <div className={styles.inputdiv}>
                              <label>Monthly Transport Fee</label>
                              <input
                                required
                                type="text"
                                placeholder="Amount"
                                value={onlyTransport}
                                onChange={(e) =>
                                  setonlyTransport(e.target.value)
                                }
                              />
                            </div>
                            <div className={styles.inputdiv}>
                              <label>Total Transport Fee</label>
                              <input
                                required
                                type="text"
                                value={Number(onlyTransport) * 12}
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
                </>
              )}
            </>
          )}
        </div>
        {shownext ? (
          <>
            <div className={styles.logbtnstylediv}>
              <button
                disabled={
                  studentname && fathersname && fathersphone ? false : true
                }
                onClick={() => setshownext(false)}
                className={
                  studentname && fathersname && fathersphone
                    ? styles.logbtnstyle
                    : styles.logbtnstyledisable
                }
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            {showdownload ? (
              <>
                <div className={styles.mainbtnndivcancel}>
                  <button
                    onClick={() => setOpen(false)}
                    className={styles.cancelbtn}
                  >
                    Okay!
                  </button>

                  <button
                    className={styles.cancelbtn}
                    onClick={() => gotoreceipt()}
                  >
                    Pay to Fee
                  </button>
                </div>
              </>
            ) : (
              <>
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
                      "Update"
                    )}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default UpdateAdmission;
