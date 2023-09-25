import React from "react";
import styles from "./FeatureRrp.module.css";
function FeatureRrp() {
  return (
    <>
      <div className={styles.mainFeature}>
        <h1>Features of Our Erp Website , Android & IOS APP</h1>
        <div  className={styles.featutecontentmain}>
          <div className={styles.mainhalf}>
            <p className={styles.featurehead}>Admission</p>
            <p>
              An admission management system is a digital solution to manage
              student enrollments in colleges, universities, and training
              institutions. Educational institutions use Education CRM to
              distribute inquiries to counselors/admission teams, follow-up with
              leads, and complete the enrollment process digitally.
            </p>
          </div>
          <div>
            <img
              className={styles.featureimg}
              src="/images/admission.png"
              alt="Logo"
            />
          </div>
        </div>
        <div className={styles.featutecontentmain1}>
          <div className={styles.marginset}>
            <p className={styles.featurehead}>Attendance</p>
            <p>
              A student attendance management system in a school ERP (enterprise
              resource planning) system is a software tool that is designed to
              automate the process of recording and tracking student attendance.
              The system typically allows teachers to mark students as present
              or absent, and to record the reason for any absences.
            </p>
          </div>
          <div>
            <img
              className={styles.featureimg}
              src="/images/attendance.png"
              alt="Logo"
            />
          </div>
        </div>

        <div className={styles.featutecontentmain}>
          <div>
            <p className={styles.featurehead}>Library</p>
            <p>
              An integrated system, single user interface with other
              departments. No customization is possible when you manage the
              library through ERP. The library is considered as a lower priority
              in comparison to other departments in Institutions. No flexibility
              in terms of library processes.
            </p>
          </div>
          <div>
            <img
              className={styles.featureimg}
              src="/images/libray.jpg"
              alt="Logo"
            />
          </div>
        </div>
        <div className={styles.featutecontentmain1}>
          <div className={styles.marginset}>
            <p className={styles.featurehead}>Assignment</p>
            <p>
              Assign To is a feature in ERPNext that allows you to assign a
              particular document to a specific user, who needs to further work
              on that document. For example, if a Sales Order needs to be
              approved or submitted by the Sales Manager, the first draft user
              can assign that Sales Order to the Sales Manager.
            </p>
          </div>
          <div>
            <img
              className={styles.featureimg}
              src="/images/assign.jpg"
              alt="Logo"
            />
          </div>
        </div>

        <div className={styles.featutecontentmain}>
          <div>
            <p className={styles.featurehead}>Fee Management</p>
            <p>
              Enterprise resource planning (ERP) refers to a type of software
              that organizations use to manage day-to-day business activities
              such as accounting, procurement, project management, risk
              management and compliance, and supply chain operations.
            </p>
          </div>
          <div>
            <img
              className={styles.featureimg}
              src="/images/fee.jpg"
              alt="Logo"
            />
          </div>
        </div>
        <div className={styles.featutecontentmain1}>
          <div className={styles.marginset}>
            <p className={styles.featurehead}>Transport</p>
            <p>
              Transportation management comprises the processes and systems used
              to manage the needs and requirements specific to the physical
              transportation of goods and cargo as part of supply chain or
              logistics management.
            </p>
          </div>
          <div>
            <img
              className={styles.featureimg}
              src="/images/trans.jpg"
              alt="Logo"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FeatureRrp;
