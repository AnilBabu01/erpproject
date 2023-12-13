import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./redux/reducers/authReducers";
import {
  getCoachingReducer,
  getSchoolReducer,
  getCollegeReducer,
  getClientReducer,
  addbatchReducer,
  getebatchReducer,
  updatebatchReducer,
  deletebatchReducer,
  addcourseReducer,
  updatecourseReducer,
  deletecourseReducer,
  getcourseReducer,
  addcategoryReducer,
  updatecategoryReducer,
  getcategoryReducer,
  deletecategoryReducer,
  addDesignationReducer,
  getcateDesignationReducer,
  updateDesignationReducer,
  deleteDesignationReducer,
  addfeeReducer,
  getcatefeeReducer,
  updatefeeReducer,
  deletefeeReducer,
  addstudentReducer,
  getstudentReducer,
  updatestudentReducer,
  deletestudentReducer,
  addEmployeeReducer,
  updateEmployeeReducer,
  deleteEmployeeReducer,
  getEmployeeReducer,
  addDepartmentReducer,
  updateDepartmentReducer,
  getDepartmentReducer,
  deleteDepartmentReducer,
  addCourseDurationReducer,
  updateCourseDurationReducer,
  getCourseDurationReducer,
  deleteCourseDurationReducer,
  addTestReducer,
  getTestReducer,
  updateTestReducer,
  deleteTestReducer,
  updateCredentialsReducer,
  getStudentTestReducer,
  updateStudentTestReducer,
  addReceiptFormatReducer,
  getReceiptFormatReducer,
  updateReceiptFormatReducer,
  getReceiptPrintReducer,
  GetSection,
  GetSession,
  GetOtherFeeReducer,
  GetSubjectReducer,
  GetClassSubjectReducer,
  GetFooterDetailsReducer,
  GetNoticReducer,
  GetSliderReducer
} from "./redux/reducers/commanReducers";
import {
  getenquiriesReducer,
  addenquiryReducer,
  updateenquiryReducer,
  deletequiryReducer,
  updateprofileReducer,
  addpayfeeReducer,
} from "./redux/reducers/coachingReducers";
import {
  MarkAttendanceReducer,
  DoneAttendanceReducer,
  MonthlyAttendanceReducer,
  getHolidayReducer,
} from "./redux/reducers/attendanceReducers";
import { getChoachingMonthlyFeeReducer } from "./redux/reducers/reportReducers";
import { GetBooks } from "./redux/reducers/libraryReducers";
import {
  GetCategory,
  GetHostel,
  GetRoom,
  GetFacility,
  GetCheckin,
} from "./redux/reducers/hostelReducers";
import {
  GetRoute,
  GetVehicle,
  GetVehicleType,
} from "./redux/reducers/transportReducers";
import { GetPayRoll } from "./redux/reducers/payrollReducers";
import {
  GetAssetTypReducer,
  GetAssetReducer,
  GetExpensesTypeReducer,
  GetExpensesReducer,
} from "./redux/reducers/expensesReducers";
const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  college: getCollegeReducer,
  school: getSchoolReducer,
  coaching: getCoachingReducer,
  client: getClientReducer,
  enquiry: getenquiriesReducer,
  addenqury: addenquiryReducer,
  updatenequiry: updateenquiryReducer,
  deleteenqury: deletequiryReducer,
  editprofile: updateprofileReducer,
  addbatch: addbatchReducer,
  getbatch: getebatchReducer,
  deletebatch: deletebatchReducer,
  editbatch: updatebatchReducer,
  addcourse: addcourseReducer,
  getcourse: getcourseReducer,
  deletecourse: deletecourseReducer,
  editcourse: updatecourseReducer,
  addcategory: addcategoryReducer,
  getcategory: getcategoryReducer,
  deletecategory: deletecategoryReducer,
  editcategory: updatecategoryReducer,
  adddesignation: addDesignationReducer,
  getdesignation: getcateDesignationReducer,
  deletedesignation: deleteDesignationReducer,
  editdesignation: updateDesignationReducer,
  addfee: addfeeReducer,
  getfee: getcatefeeReducer,
  deletefee: deletefeeReducer,
  editfee: updatefeeReducer,
  addstudent: addstudentReducer,
  getstudent: getstudentReducer,
  deletestudent: deletestudentReducer,
  editstudent: updatestudentReducer,
  markatten: MarkAttendanceReducer,
  doneatten: DoneAttendanceReducer,
  monthlyatten: MonthlyAttendanceReducer,
  addemp: addEmployeeReducer,
  updateemp: updateEmployeeReducer,
  deleteemp: deleteEmployeeReducer,
  getemp: getEmployeeReducer,
  adddepart: addDepartmentReducer,
  updatedepart: updateDepartmentReducer,
  getpart: getDepartmentReducer,
  deletedepart: deleteDepartmentReducer,
  addCourseDur: addCourseDurationReducer,
  updateCourseDur: updateCourseDurationReducer,
  getCourseDur: getCourseDurationReducer,
  deleteCourseDur: deleteCourseDurationReducer,
  addpayfeecoaching: addpayfeeReducer,
  addTest: addTestReducer,
  gettest: getTestReducer,
  updateTest: updateTestReducer,
  deleteTest: deleteTestReducer,
  updateCredentials: updateCredentialsReducer,
  getStudentTest: getStudentTestReducer,
  updateStudentTest: updateStudentTestReducer,
  addReceiptFormat: addReceiptFormatReducer,
  getReceiptFormat: getReceiptFormatReducer,
  updateReceiptFormat: updateReceiptFormatReducer,
  getHoliday: getHolidayReducer,
  getReceiptPrint: getReceiptPrintReducer,
  getChoachingMonthlyFee: getChoachingMonthlyFeeReducer,
  GetBookslist: GetBooks,
  GetCategory: GetCategory,
  GetHostel: GetHostel,
  GetRoom: GetRoom,
  GetFacility: GetFacility,
  GetRoute: GetRoute,
  GetVehicle: GetVehicle,
  GetVehicleType: GetVehicleType,
  GetPayRoll: GetPayRoll,
  GetSection: GetSection,
  GetSession: GetSession,
  GetOtherFee: GetOtherFeeReducer,
  GetAssetType: GetAssetTypReducer,
  GetAsset: GetAssetReducer,
  GetExpensesType: GetExpensesTypeReducer,
  GetExpenses: GetExpensesReducer,
  GetCheckin: GetCheckin,
  GetSubject: GetSubjectReducer,
  GetClassSubject:GetClassSubjectReducer,
  GetFooterDetails:GetFooterDetailsReducer,
  GetNotic:GetNoticReducer,
  GetSlider:GetSliderReducer
});
const middlware = [thunk];
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlware))
);
