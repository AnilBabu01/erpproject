import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/register.module.css";
import { getHolidays } from "../../../redux/actions/attendanceActions";
import { useDispatch, useSelector } from "react-redux";
import { serverInstance } from "../../../API/ServerInstance";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function AddPayroll({ setOpen, updatedata }) {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const [isdata, setisData] = useState([]);
  const [batchs, setbatchs] = useState([]);
  const [comment, setcomment] = useState("");
  const [Holidaydate, setHolidaydate] = useState("");
  const [batchname, setbatchname] = useState("");
  const [empId, setempId] = useState("");
  const [monthlist, setmonthlist] = useState("");
  const [allDetails, setallDetails] = useState("");
  const [forallbatch, setforallbatch] = useState("default");
  const { course } = useSelector((state) => state.getcourse);
  const { batch } = useSelector((state) => state.getbatch);
  const { loading, employees } = useSelector((state) => state.getemp);
  const { user } = useSelector((state) => state.auth);

  const submit = (e) => {
    e.preventDefault();
    try {
      const data = {
        holidaydate: Holidaydate,
        batchname: batchname,
        comment: comment,
        forbatch: forallbatch,
      };
      serverInstance("payroll/getMonths", "post", data).then((res) => {
        if (res?.status) {
          toast.success(res?.msg, {
            autoClose: 1000,
          });
          dispatch(getHolidays());
          // navigation.goBack();
          setOpen(false);
        }

        if (res?.status === false) {
          toast.error(res?.msg, { autoClose: 1000 });
          dispatch(getHolidays());
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getmonlist = (id) => {
    const data = {
      empid: id,
    };
    serverInstance("payroll/getMonths", "post", data).then((res) => {
      if (res?.status) {
        toast.success(res?.msg, {
          autoClose: 1000,
        });
        setmonthlist(res?.data);
        setallDetails("");
      }
    });
  };
  useEffect(() => {
    if (employees) {
      setisData(employees);
    }
  }, [employees]);
  const handlePrint = () => {
    const input = document.getElementById("receipt");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);

      if (pdf.save("SalarySlip.pdf")) {
        toast.success("Download Successfully", {
          autoClose: 1000,
        });
      }
    });
  };
  const totalopen = (attendance) => {
    let count = 0;
    attendance?.filter((item) => {
      if (
        item?.attendaceStatusIntext === "Present" ||
        item?.attendaceStatusIntext === "Absent" ||
        item?.attendaceStatusIntext === "Present Half"
      ) {
        count = count + 1;
      }
    });

    return count;
  };

  const totalpresent = (attendance) => {
    let count = 0;
    attendance?.filter((item) => {
      if (
        item?.attendaceStatusIntext === "Present" ||
        item?.attendaceStatusIntext === "Present Half"
      ) {
        count = count + 1;
      }
    });

    return count;
  };

  const totalabsent = (attendance) => {
    let count = 0;
    attendance?.filter((item) => {
      if (item?.attendaceStatusIntext === "Absent") {
        count = count + 1;
      }
    });

    return count;
  };

  const totalhalfdays = (attendance) => {
    let count = 0;
    attendance?.filter((item) => {
      if (item?.attendaceStatusIntext === "Present Half") {
        count = count + 1;
      }
    });

    return count;
  };

  console.log("hhdhsfd", monthlist);
  return (
    <>
      <div className={styles.divmainlogin}>
        <div className={styles.closeicondiv} onClick={() => setOpen(false)}>
          <CloseIcon />
        </div>
        <h1>Emplyee Salary Slip</h1>
        <div>
          <div className={styles.mainshow} ref={componentRef}>
            <div className={styles.inputdiv}>
              <label>Employee List</label>
              <select
                value={empId}
                name="empId"
                onChange={(e) => {
                  setempId(e.target.value);
                }}
                displayEmpty
              >
                <option
                  sx={{
                    fontSize: 14,
                  }}
                  value={""}
                >
                  Select Emplyee
                </option>
                {isdata &&
                  isdata?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        sx={{
                          fontSize: 14,
                        }}
                        value={item?.id}
                      >
                        {item?.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className={styles.inputdiv}>
              <p>&nbsp;</p>
              <button
                onClick={() => getmonlist(empId)}
                className={styles.showdetails}
              >
                Show Month Details
              </button>
            </div>
          </div>

          <div className={styles.monthlist}>
            {monthlist &&
              monthlist?.map((item, index) => {
                return (
                  <div key={index} className={styles.monthlist10}>
                    <input
                      name="same"
                      type="radio"
                      value={item}
                      onClick={() => {
                        setallDetails(item);
                        console.log("details", allDetails?.attendance);
                      }}
                    />
                    {item?.monthName},{item?.year}
                  </div>
                );
              })}
          </div>
          {allDetails && (
            <>
              <div id="receipt" className={styles.somepading}>
                <div className={styles.salarySlipMain}>
                  <div className={styles.salarySlipHeader}>
                    <h2>{user?.data?.CredentailsData?.institutename}</h2>
                    <p>{user?.data?.CredentailsData?.address}</p>
                    <p>
                      {user?.data?.CredentailsData?.city}
                      {user?.data?.CredentailsData?.state}
                    </p>
                    <p>{user?.data?.CredentailsData?.pincode}</p>
                  </div>
                  <div className={styles.salarySlippersonal}>
                    <p>Employee Id : {allDetails?.monthdetials?.OrEmpId}</p>
                    <p>Employee Name : {allDetails?.monthdetials?.name}</p>
                    <p>
                      Designation : {allDetails?.attendance[0]?.Designation}
                    </p>
                  </div>
                  <div>
                    <p>Salary Details</p>
                    <table className={styles.tabletable}>
                      <tbody>
                        <tr className={styles.tabletr}>
                          <th className={styles.tableth}>Earnings</th>
                          <th className={styles.tableth}>Amount</th>
                          <th className={styles.tableth}>Deduction</th>
                          <th className={styles.tableth}>Amount</th>
                        </tr>
                        <tr className={styles.tabletr}>
                          <td className={styles.tableth}>Basic</td>  
                          <td className={styles.tableth}>
                            {allDetails?.monthdetials?.basicsalary}
                          </td>
                          <td className={styles.tableth}>
                            {allDetails?.monthdetials?.Deduction1}
                          </td>
                          <td className={styles.tableth}>
                            {allDetails?.monthdetials?.DeductionAmount1}
                          </td>
                        </tr>
                        {allDetails?.monthdetials?.Allowance1 && (
                          <>
                            <tr className={styles.tabletr}>
                              <td className={styles.tableth}>
                                {allDetails?.monthdetials?.Allowance1}
                              </td>
                              <td className={styles.tableth}>
                                {allDetails?.monthdetials?.AllowanceAmount1}
                              </td>
                              <td className={styles.tableth}>
                                {allDetails?.monthdetials?.Deduction2}
                              </td>
                              <td className={styles.tableth}>
                                {allDetails?.monthdetials?.DeductionAmount2}
                              </td>
                            </tr>
                          </>
                        )}
                        {allDetails?.monthdetials?.Allowance2 && (
                          <>
                            <tr className={styles.tabletr}>
                              <td className={styles.tableth}>
                                {allDetails?.monthdetials?.Allowance2}
                              </td>
                              <td className={styles.tableth}>
                                {allDetails?.monthdetials?.AllowanceAmount2}
                              </td>

                              <td className={styles.tableth}>&nbsp;</td>
                              <td className={styles.tableth}>&nbsp;</td>
                            </tr>
                          </>
                        )}
                        {allDetails?.monthdetials?.Allowance3 && (
                          <>
                            <tr className={styles.tabletr}>
                              <td className={styles.tableth}>
                                {allDetails?.monthdetials?.Allowance3}
                              </td>
                              <td className={styles.tableth}>
                                {allDetails?.monthdetials?.AllowanceAmount3}
                              </td>

                              <td className={styles.tableth}>&nbsp;</td>
                              <td className={styles.tableth}>&nbsp;</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className={styles.mainattendhow}>
                    <table className={styles.tabletable}>
                      <tbody>
                        <tr className={styles.tabletr}>
                          {allDetails?.days?.map((item, index) => {
                            return (
                              <th key={index} className={styles.tableth}>
                                {item}
                              </th>
                            );
                          })}
                        </tr>
                        <tr className={styles.tabletr}>
                          {allDetails?.attendance &&
                            allDetails?.attendance?.map((item, index) => {
                              return (
                                <td className={styles.tableth} key={index}>
                                  {item?.attendaceStatusIntext ===
                                    "Present" && <>P</>}
                                  {item?.attendaceStatusIntext ===
                                    "Present Half" && <>HD</>}
                                  {item?.attendaceStatusIntext === "Absent" && (
                                    <>A</>
                                  )}
                                  {item?.attendaceStatusIntext ===
                                    "Holiday" && <>H</>}
                                  {item?.attendaceStatusIntext ===
                                    "On Leave" && <>L</>}
                                </td>
                              );
                            })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className={styles.maindivflesxs}>
                    <div>
                      <p>
                        Total Open Coaching &nbsp; (
                        {allDetails && totalopen(allDetails?.attendance)})
                      </p>
                      <p>
                        Total Present &nbsp; (
                        {allDetails && totalpresent(allDetails?.attendance)} )
                      </p>
                      <p>
                        Total Absent &nbsp; (
                        {allDetails && totalabsent(allDetails?.attendance)})
                      </p>
                    </div>
                    <div>
                      <p>
                        Per Day Amount &nbsp; (
                        {Math.floor(
                          Number(allDetails?.monthdetials?.basicsalary) / 30
                        )}
                        )
                      </p>
                      <p>
                        Basic Salary + Allowances &nbsp; (
                        {Number(allDetails?.monthdetials?.basicsalary) +
                          Number(allDetails?.monthdetials?.AllowanceAmount1) +
                          Number(allDetails?.monthdetials?.AllowanceAmount2) +
                          Number(allDetails?.monthdetials?.AllowanceAmount3)}
                        )
                      </p>
                      <p>
                        Total Deduction&nbsp; (
                        {Number(allDetails?.monthdetials?.DeductionAmount1) +
                          Number(allDetails?.monthdetials?.DeductionAmount2)}
                        )
                      </p>
                      <p>
                        Payable Amount &nbsp; (
                        {Math.floor(
                          Number(allDetails?.monthdetials?.basicsalary) / 30
                        ) *
                          totalpresent(allDetails?.attendance) +
                          Number(allDetails?.monthdetials?.AllowanceAmount1) +
                          Number(allDetails?.monthdetials?.AllowanceAmount2) +
                          Number(allDetails?.monthdetials?.AllowanceAmount3) -
                          (Number(allDetails?.monthdetials?.DeductionAmount1) +
                            Number(
                              allDetails?.monthdetials?.DeductionAmount2
                            )) -
                          (Math.floor(
                            Number(allDetails?.monthdetials?.basicsalary) / 30
                          ) /
                            2) *
                            totalhalfdays(allDetails?.attendance)}
                        )
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className={styles.logbtnstylediv}>
            <button className={styles.showdetails}>Salary Pay Now</button>
            <button
              className={styles.showdetails}
              onClick={() => handlePrint()}
            >
              DownLoad Slip
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPayroll;
