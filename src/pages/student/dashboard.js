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

function Dashboard() {
  
  const dispatch = useDispatch();
  const [sliderimglist, setsliderimglist] = useState([]);
  const [noticlist, setnoticlist] = useState([]);
  const { notic } = useSelector((state) => state.GetNotic);
  const { slider } = useSelector((state) => state.GetSlider);

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
        <div className={Styles.mainmarg}>
          <Marquee className={Styles.mainmar} speed={100}>
            {noticlist?.length > 0 &&
              noticlist?.map((item, index) => {
                return <Infocard key={index} item={item} />;
              })}
          </Marquee>
        </div>
        <div className={Styles.mainmarg}>
          <Carousel
            infiniteLoop={true}
            autoPlay={true}
            showIndicators={false}
            stopOnHover={false}
            autoFocus={true}
            showStatus={false}
            showThumbs={false}
            showArrows={false}
            dots={false}
          >
            {sliderimglist?.length > 0 &&
              sliderimglist?.map((item, index) => {
                return (
                  <div className={Styles.sliderimgdiv}>
                    <img
                      key={index}
                      src={`${backendUrl}public/upload/${item?.ImgUrl}`}
                      alt="nhbbb"
                    />
                    <div className={Styles.overtextdiv}>
                      <p>{item?.Dec}</p>
                    </div>
                  </div>
                );
              })}
          </Carousel>
        </div>
        <div className={Styles.mainmarg}>
          <div className={Styles.mainfooter}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
