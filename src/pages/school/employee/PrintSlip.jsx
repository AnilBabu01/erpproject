import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/register.module.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
function PrintSlip() {
  const router = useRouter();
  const componentRef = useRef(null);
  const { receiptdata } = router.query;
  const [allDetails, setallDetails] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (receiptdata) {
      setallDetails(JSON.parse(receiptdata));
    }
  }, []);

  const down = () => {
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const totalopen = (attendance) => {
    let count = 0;
    let monthno = Number(new Date().getMonth()) + 1;
    console.log(
      "Print data is total",
      allDetails?.attendance[0]?.monthNumber,
      monthno
    );

    if (
      Number(allDetails?.attendance[0]?.monthNumber) === Number(new Date().getMonth())
    ) {
      allDetails?.attendance
        ?.slice(0, Number(new Date()?.toISOString().substring(8, 10)))
        ?.filter((item) => {
          if (
            item?.attendaceStatusIntext === "Present" ||
            item?.attendaceStatusIntext === "Absent" ||
            item?.attendaceStatusIntext === "Present Half"
          ) {
            count = count + 1;
          }
        });
    } else {
      allDetails?.attendance?.filter((item) => {
        if (
          item?.attendaceStatusIntext === "Present" ||
          item?.attendaceStatusIntext === "Absent" ||
          item?.attendaceStatusIntext === "Present Half"
        ) {
          count = count + 1;
        }
      });
    }

    return count;
  };

  const totalpresent = (attendance) => {
    let count = 0;
    (allDetails &&
    allDetails?.attendance[0]?.monthNumber === Number(new Date().getMonth())
      ? allDetails?.attendance?.slice(
          0,
          Number(new Date()?.toISOString().substring(8, 10))
        )
      : allDetails?.attendance
    )?.filter((item) => {
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
    (allDetails &&
    allDetails?.attendance[0]?.monthNumber === Number(new Date().getMonth())
      ? allDetails?.attendance?.slice(
          0,
          Number(new Date()?.toISOString().substring(8, 10))
        )
      : allDetails?.attendance
    )?.filter((item) => {
      if (item?.attendaceStatusIntext === "Absent") {
        count = count + 1;
      }
    });

    return count;
  };

  const totalhalfdays = (attendance) => {
    let count = 0;
    (allDetails &&
    allDetails?.attendance[0]?.monthNumber === Number(new Date().getMonth())
      ? allDetails?.attendance?.slice(
          0,
          Number(new Date()?.toISOString().substring(8, 10))
        )
      : allDetails?.attendance
    )?.filter((item) => {
      if (item?.attendaceStatusIntext === "Present Half") {
        count = count + 1;
      }
    });

    return count;
  };

  return (
    <>
      <div className={styles.mainslipdivtop}>
        <div className={styles.optionDiv}>
          <button className={styles.optionbtn} onClick={() => router.back()}>
            Back
          </button>
          <button className={styles.optionbtn} onClick={() => down()}>
            Download
          </button>
          <button className={styles.optionbtn} onClick={() => handlePrint()}>
            Print
          </button>
        </div>
        <div>
          <div id="receipt" ref={componentRef} className={styles.somepading}>
            <div className={styles.salarySlipMain}>
              <img src={user?.data?.CredentailsData?.logourl} alt="Watter" />
              <div className={styles.overlaydiv}>
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
                  <p>Designation : {allDetails?.monthdetials?.employeeof}</p>
                </div>
                <div>
                  <p>Salary Details</p>
                  <table className={styles.tabletablemain}>
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
                  <table className={styles.tabletablemain}>
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
                        {allDetails?.attendance != null &&
                          (allDetails?.attendance[0]?.monthNumber ===
                          Number(new Date().getMonth()) + 1
                            ? allDetails?.attendance?.slice(
                                0,
                                Number(
                                  new Date()?.toISOString().substring(8, 10)
                                )
                              )
                            : allDetails?.attendance
                          )?.map((item, index) => {
                            return (
                              <td className={styles.tableth} key={index}>
                                {item?.attendaceStatusIntext === "Present" && (
                                  <>P</>
                                )}
                                {item?.attendaceStatusIntext ===
                                  "Present Half" && <>HD</>}
                                {item?.attendaceStatusIntext === "Absent" && (
                                  <>A</>
                                )}
                                {item?.attendaceStatusIntext === "Holiday" && (
                                  <>H</>
                                )}
                                {item?.attendaceStatusIntext === "On Leave" && (
                                  <>L</>
                                )}
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
                      Total Open Coaching &nbsp;
                      {allDetails && totalopen()}
                    </p>
                    <p>
                      Total Present &nbsp;
                      {allDetails && totalpresent()}
                    </p>
                    <p>
                      Total Absent &nbsp;
                      {allDetails && totalabsent()}
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
                    <p>Payable Amount {allDetails?.monthdetials?.PaidAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrintSlip;
