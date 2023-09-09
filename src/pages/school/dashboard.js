import React, { useEffect } from "react";
import TopCard from "../../component/MainAdmin/TopCard";
import Barchart from "../../component/MainAdmin/Barchart";
import Linechart from "../../component/MainAdmin/Linechart";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/authActions";

function dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <div className="mainContainer">
        <div className="top-info-main-div">
          <TopCard img="/images/dash2.jpg" value={"3,256"} text={"Employees"} />
          <TopCard img="/images/dash2.jpg" value={"394"} text={"Students"} />
          <TopCard img="/images/dash2.jpg" value={"394"} text={"Parents"} />

          <TopCard
            img="/images/dash2.jpg"
            value={"394"}
            text={"Present Teachers"}
          />
          <TopCard
            img="/images/dash2.jpg"
            value={"394"}
            text={"Present Students"}
          />
          <TopCard img="/images/dash2.jpg" value={"394"} text={"Addmission"} />

          <TopCard img="/images/dash3.jpg" value={"₹2536"} text={"Paid Fees"} />
          <TopCard
            img="/images/dash3.jpg"
            value={"₹2536"}
            text={"Pending Fees"}
          />

          <TopCard img="/images/dash1.jpg" value={"3,256"} text={"Paid Fine"} />
          <TopCard img="/images/dash1.jpg" value={"3,256"} text={"Paid Fine"} />
        </div>

        <div className="middle-chart-main-div">
          <div className="bottom-chart-left-div">
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Paid Fees Data Data</p>
                <div className="SortDown-div-bottom">
                  <p>Short by Years</p>
                  <img src="/images/Sort Down.png" alt="SortDown" />
                </div>
              </div>

              <Linechart value={"Paid Fees Data"} />
            </div>
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Pending Fees Data</p>
                <div className="SortDown-div-bottom">
                  <p>Short by Years</p>
                  <img src="/images/Sort Down.png" alt="SortDown" />
                </div>
              </div>

              <Barchart value={"Pending Fees"} />
            </div>
          </div>
          <div className="bottom-chart-left-div">
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Revenue Data </p>
                <div className="SortDown-div-bottom">
                  <p>Short by Years</p>
                  <img src="/images/Sort Down.png" alt="SortDown" />
                </div>
              </div>

              <Linechart value={"Revenue Data"} />
            </div>
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Exhausted Plans Data</p>
                <div className="SortDown-div-bottom">
                  <p>Short by Years</p>
                  <img src="/images/Sort Down.png" alt="SortDown" />
                </div>
              </div>

              <Barchart value={"Exhausted Plans Data"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default dashboard;
