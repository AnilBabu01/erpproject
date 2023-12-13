import React, { useEffect } from "react";
import { loadUser } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import AdminProfile from "@/component/admin/AdminProfile";
import CollegeProfile from "@/component/college/Profile/CollegeProfile";
import SchoolProfile from "@/component/Institute/Profile/SchoolProfile";
import CoachingProfile from "@/component/Coaching/Profile/CoachingProfile";
import EmployeeProfile from "@/component/Emplyee/EmployeeProfile";
import StudentProfile from "@/component/Student/StudentProfile";
import ParentProfile from "@/component/parent/ParentProfile";

function Profile() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);

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
