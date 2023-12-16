import React, { useState, useEffect } from "react";
import { GetNotic, GetSlider } from "../../../redux/actions/commanAction";
import { useDispatch, useSelector } from "react-redux";
function HomeChangeingImg() {
  const [sliderimglist, setsliderimglist] = useState([]);
  const { slider } = useSelector((state) => state.GetSlider);
  useEffect(() => {
    if (slider) {
      setsliderimglist(slider);
    }
  }, [slider]);
  return (
    <>
      <div className="rightside_container">
        <img className="first" src="/images/welcomePrent.jpg" alt="" />
        <img className="second" src="/images/welcomePrent1.jpg" alt="" />
      </div>
    </>
  );
}

export default HomeChangeingImg;

// <div className="leftside_container">
// <div className="card_container_skills">
//   <div className="skills_heading">
//     <h3>Showcase your skills globally</h3>
//     <p>
//       Based on your skill profile FindMyNext provides seamless access
//       to fulltime, freelancing, work from home, consulting, remote
//       working opportunities worldwide.z
//     </p>
//     <hr />
//   </div>
//   <div className="skills_subheading">
//     <h3>Find Work Faster</h3>
//     <hr />
//     <h3>Get the Goodness Score Advantage</h3>
//     <hr />
//     <h3>Get work that suits you best</h3>
//     {/* <hr /> */}
//   </div>
// </div>
// </div>
