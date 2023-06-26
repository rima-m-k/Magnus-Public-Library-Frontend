import React from "react";
import { Link } from "react-router-dom";
import Login from "../pages/user/Login";
import StaffLogin from "../pages/admin/StaffLogin";

function Footer() {
  return (
    <footer className="bg-gray-200 text-black py-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between items-center mx-3 px-3 font-light">
          <Link to="NoticeBoard" element={<Login />} className="footer-link">
            Notice Board
          </Link>
          <Link to="NoticeBoard" element={<Login />} className="footer-link">
            Community
          </Link>
          <Link to="NoticeBoard" element={<Login />} className="footer-link">
            Venue Hire{" "}
          </Link>
          <Link
            to="admin/staffPortal"
            element={<StaffLogin />}
            className="footer-link"
          >
            Staff Portal{" "}
          </Link>
          <Link to="NoticeBoard" element={<Login />} className="footer-link">
            Donate{" "}
          </Link>
          {/* <Link to="NoticeBoard" element={<Login />} className="footer-link">
            Report a problem{" "}
          </Link> */}
          {/* <Link to="NoticeBoard" element={<Login />} className="footer-link">
            Support Us{" "}
          </Link> */}
          {/* <Link to="NoticeBoard" element={<Login />} className="footer-link">
            Feedback{" "}
          </Link> */}
          {/* <Link to="NoticeBoard" element={<Login />} className="footer-link">
            Contact{" "}
          </Link> */}
          <Link to="NoticeBoard" element={<Login />} className="footer-link">
            About{" "}
          </Link>
        </div>
        <hr className="my-2 border-gray-500" />
        <div className="flex justify-center items-center font-light">
          <span>&copy; 2023</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
