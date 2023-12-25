import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/authActions";
import Marquee from "react-fast-marquee";
import Infocard from "../../component/Student/Infocard";
import Styles from "./Dashboard.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Footer from "../../component/Student/Footer";
import { GetNotic, GetSlider } from "../../redux/actions/commanAction";
import { backendUrl } from "../../config/config";
import SchoolOptions from "@/component/parent/SchoolParent/SchoolOptions";
import HomeChangeingImg from "@/component/parent/SchoolParent/HomeChangeingImg";
function Dashboard() {
  const dispatch = useDispatch();
  const [sliderimglist, setsliderimglist] = useState([]);
  const [noticlist, setnoticlist] = useState([]);
  const { notic } = useSelector((state) => state.GetNotic);
  const { slider } = useSelector((state) => state.GetSlider);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    // dispatch(loadUser());
    dispatch(GetNotic());
    dispatch(GetSlider());
  }, []);

  useEffect(() => {
    if (notic) {
      setnoticlist(notic);
    }

    if (slider) {
      setsliderimglist(slider);
    }
  }, [notic, slider]);

  return (
    <>
      <div className="mainContainer">
        <div>
          <Marquee className={Styles.mainmar} speed={100}>
            {noticlist?.length > 0 &&
              noticlist?.map((item, index) => {
                return <Infocard key={index} item={item} />;
              })}
          </Marquee>
        </div>
        {/* <HomeChangeingImg /> */}

        <SchoolOptions />

        {user?.data?.CredentailsData?.userType === "institute" ? (
          ""
        ) : (
          <>
            <div>
              <div className={Styles.mainfooter}>
                <Footer />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
