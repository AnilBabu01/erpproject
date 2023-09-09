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
          <TopCard
            img="/images/dash1.jpg"
            value={"3,256"}
            text={"Active Plans"}
          />
          <TopCard img="/images/dash2.jpg" value={"394"} text={"Clients"} />
          <TopCard img="/images/dash2.jpg" value={"394"} text={"Guests"} />
          <TopCard img="/images/dash3.jpg" value={"₹2536"} text={"Revenue"} />
          <TopCard
            img="/images/dash4.jpg"
            value={"38"}
            text={"Exhausted Plans"}
          />
        </div>

        <div className="middle-chart-main-div">
          <div className="bottom-chart-left-div">
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Active Plans Data</p>
                <div className="SortDown-div-bottom">
                  <p>Short by Years</p>
                  <img src="/images/Sort Down.png" alt="SortDown" />
                </div>
              </div>

              <Linechart value={"Plans Data"} />
            </div>
            <div className="bottom-chart-left-div-inear1">
              <div className="day-by-div">
                <p>Monthly Clients Data</p>
                <div className="SortDown-div-bottom">
                  <p>Short by Years</p>
                  <img src="/images/Sort Down.png" alt="SortDown" />
                </div>
              </div>

              <Barchart value={"Clients Data"} />
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
