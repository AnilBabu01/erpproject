import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/authActions";
import Marquee from "react-fast-marquee";
import Infocard from "../../component/Student/Infocard";
import Styles from "./Dashboard.module.css";
import StudentList from "../../component/parent/StudentList";
function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <div className="mainContainer">
        <div className={Styles.mainmarg}>
          <Marquee className={Styles.mainmar} speed={100}>
            <Infocard />
            <Infocard />
            <Infocard />
          </Marquee>
          <h2 className={Styles.chiltext}>Student List</h2>
          <StudentList />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
