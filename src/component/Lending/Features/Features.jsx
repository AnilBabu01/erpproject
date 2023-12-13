import React from "react";

export default function Features() {
  return (
    <div className="FeaturedCompanies" id="Company">
      <div className="featuredcompanies">
        <div className="head-FC">
          {/* <h2>Features of Our Erp Website , Android & IOS APP</h2> */}
          {/* <h4 className="YFBH">Your Future Begins Here</h4> */}
        </div>
        <div className="body-FC">
          <div className="body-FC-col-1">
            <div className="images_KPIT">
              <img src="images/attendance1.png" alt="" className="FCIMG" />
            </div>
            <div className="images_HCL">
              <img src="images/admiss.webp" alt="" className="FCIMG" />
            </div>
            <div className="images_Apple">
              <img src="images/assign1.jpg" alt="" className="FCIMG" />
            </div>
            <div className="images_FCart1">
              <img src="images/attendance1.png" alt="" className="FCIMG" />
            </div>
            <div className="images_TCS">
              <img src="images/atttt.jpg" alt="" className="FCIMG" />
            </div>
          </div>
          <div className="body-FC-col-2">
            <div className="images_Adobe">
              <img src="images/library1.png" alt="" className="FCIMG" />
            </div>
            <div className="images_FCart">
              <img src="images/hrr.jpg" alt="" className="FCIMG" />
            </div>
            <div className="images_Infosys">
              <img src="images/fee1.png" alt="" className="FCIMG" />
            </div>
            <div className="images_4">
              <img src="images/library1.png" alt="" className="FCIMG" />
            </div>

            {/* <div className="images_Infosys"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
