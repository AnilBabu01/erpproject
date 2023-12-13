import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/authActions";
import Marquee from "react-fast-marquee";
import Infocard from "../../component/Student/Infocard";
import Styles from "./Dashboard.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Footer from "../../component/Student/Footer";
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
            <div className={Styles.sliderimgdiv}>
              <img src="/images/iment1.jpg" alt="nhbbb" />
              <div className={Styles.overtextdiv}>
                <p>
                  Please Submit Your Fee if You Allready Paid then ignore this
                  meessage
                </p>
              </div>
            </div>
            <div className={Styles.sliderimgdiv}>
              <img src="/images/iment2.jpg" alt="nhbbb" />
              <div className={Styles.overtextdiv}>
                <p>
                  Please Submit Your Fee if You Allready Paid then ignore this
                  meessage
                </p>
              </div>
            </div>
            <div className={Styles.sliderimgdiv}>
              <img src="/images/iment3.jpg" alt="nhbbb" />
              <div className={Styles.overtextdiv}>
                <p>
                  Please Submit Your Fee if You Allready Paid then ignore this
                  meessage
                </p>
              </div>
            </div>
            <div className={Styles.sliderimgdiv}>
              <img src="/images/iment4.jpg" alt="nhbbb" />
              <div className={Styles.overtextdiv}>
                <p>
                  Please Submit Your Fee if You Allready Paid then ignore this
                  meessage
                </p>
              </div>
            </div>
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
