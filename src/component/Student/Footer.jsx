import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetFooterDetails } from "../../redux/actions/commanAction";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
const Footer = () => {
  const dispatch = useDispatch();
  const [Footerdetails, setFooterdetails] = useState("");
  const { footerdetails } = useSelector((state) => state.GetFooterDetails);

  console.log("Footer data is", Footerdetails[0]?.facilitycontent);

  useEffect(() => {
    dispatch(GetFooterDetails());
  }, []);

  useEffect(() => {
    if (footerdetails) {
      setFooterdetails(footerdetails);
    }
  }, [footerdetails]);

  return (
    <>
      <div className="mainfooter">
        <div className="footercontent">
          <div className="divourtext">
            <Typography
              variant="h6"
              style={{ fontWeight: "400", marginBottom: "20px" }}
            >
              Our Services
            </Typography>
            <div className="mardivcontentlink">
              <p>{Footerdetails[0]?.facilitycontent}</p>
            </div>
          </div>

          <div className="phonecon10">
            <Typography
              variant="h6"
              style={{ fontWeight: "400", marginBottom: "20px" }}
            >
              Social Media
            </Typography>
            <div className="mardivcontentlink10">
              <a target="blank" href={Footerdetails[0]?.facebookurl}>
                <FacebookIcon />
              </a>
              <a target="blank" href={Footerdetails[0]?.instagramurl}>
                <InstagramIcon />
              </a>
              <a target="blank" href={Footerdetails[0]?.twiterurl}>
                <TwitterIcon />
              </a>
              <a target="blank" href={Footerdetails[0]?.linkldlurl}>
                <LinkedInIcon />
              </a>
            </div>
          </div>
          <div className="phonecon">
            <Typography
              variant="h6"
              style={{ fontWeight: "400", marginBottom: "20px" }}
            >
              Pages
            </Typography>
            <div className="mardivcontentlink">
              <Link href="/student/dashboard">Home</Link>
              <Link href="/student/attendance">Attendance</Link>
              <Link href="/student/fee">Fee</Link>
              <Link href="/student/test">Test</Link>
            </div>
          </div>
          <div className="phonecon">
            <Typography
              variant="h6"
              style={{ fontWeight: "400", marginBottom: "20px" }}
            >
              Contact Us
            </Typography>
            <div className="mardivcontentlink">
              <p>
                <CallIcon />
                {Footerdetails[0]?.ChairmanContactNo} (Chair man)
              </p>
              <p>
                <CallIcon />
                {Footerdetails[0]?.PrincipalContactNo} (Principal)
              </p>
              <p>
                <EmailIcon />
                {Footerdetails[0]?.Email}
              </p>
              <p>
                <LocationOnIcon />
                Location
                <br />
              </p>
              <div className="col-3">
                <div className="bigLogo">
                  <iframe
                    src={Footerdetails[0]?.Mapurl}
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <button className="top">
                  <a href="#">⬆</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
