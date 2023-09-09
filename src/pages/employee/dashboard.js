import React, { useEffect } from "react";
import TopCard from "../../component/MainAdmin/TopCard";
import Barchart from "../../component/MainAdmin/Barchart";
import Linechart from "../../component/MainAdmin/Linechart";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/authActions";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <div className="mainContainer">
        <div className="top-info-main-div">
          <TopCard img="/images/dash2.jpg" value={"56"} text={"Student"} />
          <TopCard
            img="/images/dash2.jpg"
            value={"20"}
            text={"Present Student"}
          />
          <TopCard
            img="/images/dash2.jpg"
            value={"36"}
            text={"Absent Student"}
          />
          <TopCard img="/images/dash2.jpg" value={"394"} text={"Assignment"} />
          <TopCard
            img="/images/dash2.jpg"
            value={"394"}
            text={"ReceivedAssignment"}
          />
        </div>

        <div className="middle-chart-main-div">
          <div className="bottom-chart-left-div">
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Present Student Data</p>
                <div className="SortDown-div-bottom">
                  <p>Short by Years</p>
                  <img src="/images/Sort Down.png" alt="SortDown" />
                </div>
              </div>

              <Linechart value={"Present Student Data"} />
            </div>
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Absent Student Data</p>
                <div className="SortDown-div-bottom">
                  <p>Short by Years</p>
                  <img src="/images/Sort Down.png" alt="SortDown" />
                </div>
              </div>
              <Barchart value={"Absent Student"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
