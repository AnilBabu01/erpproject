import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/authActions";
import styles from "../../styles/register.module.css";
function Dashboard() {
  const dispatch = useDispatch();
  const [active, setactive] = useState(false);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <div className="mainContainer">
        <div className="middle-chart-main-div">
          <div className="bottom-chart-left-div">
            <div className="bottom-chart-left-div-inear10">
              <button
                onClick={() => setactive(true)}
                className={
                  active === true ? styles.dashActiveBtn : styles.dashDisableBtn
                }
              >
                Today Time Table
              </button>
              <button
                onClick={() => setactive(false)}
                className={
                  active === false ? styles.dashActiveBtn : styles.dashDisableBtn
                }
              >
                Full Time Table
              </button>

              {active===true?<>
                <p>Today Time Table</p>
              
              </>:<>
              <p>Full Time Table</p>
              </>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
