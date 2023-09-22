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
          <TopCard img="/images/dash2.jpg" value={"10"} text={"Batch"} />
          <TopCard img="/images/dash2.jpg" value={"10"} text={"Student"} />
          <TopCard img="/images/dash2.jpg" value={"6"} text={"Present"} />
          <TopCard img="/images/dash2.jpg" value={"4"} text={"Absent"} />
          <TopCard img="/images/dash2.jpg" value={"4"} text={"Staff"} />
        </div>

        <div className="middle-chart-main-div">
          <div className="bottom-chart-left-div">
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Enquiry Data</p>
                <div className="SortDown-div-bottom">
                  <p>Short by Years</p>
                  <img src="/images/Sort Down.png" alt="SortDown" />
                </div>
              </div>

              <Linechart value={"Enquiry Data"} />
            </div>
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Active Students Data</p>
                <div className="SortDown-div-bottom">
                  <p>Short by Years</p>
                  <img src="/images/Sort Down.png" alt="SortDown" />
                </div>
              </div>

              <Barchart value={"Active Students Data"} />
            </div>
          </div>
          <div className="bottom-chart-left-div">
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Deactive Students Data </p>
                <div className="SortDown-div-bottom">
                  <p>Short by Years</p>
                  <img src="/images/Sort Down.png" alt="SortDown" />
                </div>
              </div>

              <Linechart value={"Deactive  Student Data"} />
            </div>
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Fee Collection Data</p>
                <div className="SortDown-div-bottom">
                  <p>Short by Years</p>
                  <img src="/images/Sort Down.png" alt="SortDown" />
                </div>
              </div>

              <Barchart value={"Fee Collection Data"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
