import React from "react";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from 'next/link';
const Footer = () => {
  return (
    <>
      <div className="mainfooter">
        <div className="footercontent">
          <div className="phonecon">
            <Typography
              variant="h6"
              style={{ fontWeight: "400", marginBottom: "20px" }}
            >
              Our Services
            </Typography>
            <div className="mardivcontentlink">
              <p>
                Coaching centres use a variety of strategies <br /> to make
                education more interesting and useful, <br /> including online
                courses, gamification, and <br /> interactive learning
                technologies. Enrolled students <br /> get access to a wealth of
                resources, <br /> including books, example papers, and digital
                media
              </p>
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
              <Link href="/rental">
                <FacebookIcon />
              </Link>
              <Link href="/rental">
                <InstagramIcon />
              </Link>
              <Link href="/rental">
                <TwitterIcon />
              </Link>
              <Link href="/rental">
                <LinkedInIcon />
              </Link>
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
                +91-7771835891 (Chair man)
              </p>
              <p>
                <CallIcon />
                +91-7771834880 (Principal)
              </p>
              <p>
                <EmailIcon />
                ab@gmail.com
              </p>
              <p>
                <LocationOnIcon />
                Location
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
