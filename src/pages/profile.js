import React from "react";
import AdminProfile from "@/component/admin/AdminProfile";
import CollegeProfile from "@/component/college/Profile/CollegeProfile";
import SchoolProfile from "@/component/Institute/Profile/SchoolProfile";
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
            {user?.data?.User?.userType === "school" && <SchoolProfile />}
            {user?.data?.User?.userType === "college" && <CollegeProfile />}
            {user?.data?.User?.userType === "institute" && <CoachingProfile />}
            {user?.data?.User?.userType === "admin" && <AdminProfile />}
            {user?.data?.User?.userType === "employee" && <EmployeeProfile />}
            {user?.data?.User?.userType === "student" && <StudentProfile />}
            {user?.data?.User?.userType === "parent" && <ParentProfile />}
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
