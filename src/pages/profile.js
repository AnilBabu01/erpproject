import React from "react";
import AdminProfile from "@/component/admin/AdminProfile";
import CollegeProfile from "@/component/college/CollegeProfile";
import SchoolProfile from "@/component/Institute/SchoolProfile";
import CoachingProfile from "@/component/Coaching/Profile/CoachingProfile";
import EmployeeProfile from "@/component/Emplyee/EmployeeProfile";
import StudentProfile from "@/component/Student/StudentProfile";
import ParentProfile from "@/component/parent/ParentProfile";
import { useSelector } from "react-redux";

function Profile() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="mainContainer">
        {isAuthenticated && (
          <>
            {user?.data[0]?.userType === "school" && <SchoolProfile />}
            {user?.data[0]?.userType === "college" && <CollegeProfile />}
            {user?.data[0]?.userType === "institute" && <CoachingProfile />}
            {user?.data[0]?.userType === "admin" && <AdminProfile />}
            {user?.data[0]?.userType === "employee" && <EmployeeProfile />}
            {user?.data[0]?.userType === "student" && <StudentProfile />}
            {user?.data[0]?.userType === "parent" && <ParentProfile />}
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
