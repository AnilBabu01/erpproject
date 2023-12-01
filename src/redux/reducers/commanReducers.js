import { Cases } from "@mui/icons-material";
import {
  ALL_COACHING_REQUEST,
  ALL_COACHING_SUCCESS,
  ALL_COACHING_FAIL,
  ALL_COLLEGE_REQUEST,
  ALL_COLLEGE_SUCCESS,
  ALL_COLLEGE_FAIL,
  ALL_SCHOOL_REQUEST,
  ALL_SCHOOL_SUCCESS,
  ALL_SCHOOL_FAIL,
  ALL_CLIENT_REQUEST,
  ALL_CLIENT_SUCCESS,
  ALL_CLIENT_FAIL,
  ADD_BATCH_REQUEST,
  ADD_BATCH_SUCCESS,
  ADD_BATCH_FAIL,
  UPDATE_BATCH_REQUEST,
  UPDATE_BATCH_SUCCESS,
  UPDATE_BATCH_FAIL,
  DELETE_BATCH_REQUEST,
  DELETE_BATCH_SUCCESS,
  DELETE_BATCH_FAIL,
  ALL_BATCH_REQUEST,
  ALL_BATCH_SUCCESS,
  ALL_BATCH_FAIL,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAIL,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  ALL_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  ADD_FEESTRUCTURE_REQUEST,
  ADD_FEESTRUCTURE_SUCCESS,
  ADD_FEESTRUCTURE_FAIL,
  UPDATE_FEESTRUCTURE_REQUEST,
  UPDATE_FEESTRUCTURE_SUCCESS,
  UPDATE_FEESTRUCTURE_FAIL,
  DELETE_FEESTRUCTURE_REQUEST,
  DELETE_FEESTRUCTURE_SUCCESS,
  DELETE_FEESTRUCTURE_FAIL,
  ALL_FEESTRUCTURE_REQUEST,
  ALL_FEESTRUCTURE_SUCCESS,
  ALL_FEESTRUCTURE_FAIL,
  ADD_EMPLOYEETYPE_REQUEST,
  ADD_EMPLOYEETYPE_SUCCESS,
  ADD_EMPLOYEETYPE_FAIL,
  UPDATE_EMPLOYEETYPE_REQUEST,
  UPDATE_EMPLOYEETYPE_SUCCESS,
  UPDATE_EMPLOYEETYPE_FAIL,
  DELETE_EMPLOYEETYPE_REQUEST,
  DELETE_EMPLOYEETYPE_SUCCESS,
  DELETE_EMPLOYEETYPE_FAIL,
  ALL_EMPLOYEETYPE_REQUEST,
  ALL_EMPLOYEETYPE_SUCCESS,
  ALL_EMPLOYEETYPE_FAIL,
  // ADD_BRANCH_REQUEST,
  // ADD_BRANCH_SUCCESS,
  // ADD_BRANCH_FAIL,
  // UPDATE_BRANCH_REQUEST,
  // UPDATE_BRANCH_SUCCESS,
  // UPDATE_BRANCH_FAIL,
  // DELETE_BRANCH_REQUEST,
  // DELETE_BRANCH_SUCCESS,
  // DELETE_BRANCH_FAIL,
  // ALL_BRANCH_REQUEST,
  // ALL_BRANCH_SUCCESS,
  // ALL_BRANCH_FAIL,
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
  ADD_STUDENT_RESET,
  UPDATE_STUDENT_REQUEST,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAIL,
  ALL_STUDENT_REQUEST,
  ALL_STUDENT_SUCCESS,
  ALL_STUDENT_FAIL,
  DELETE_STUDENT_REQUEST,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAIL,
  ADD_Designation_REQUEST,
  ADD_Designation_SUCCESS,
  ADD_Designation_FAIL,
  DELETE_Designation_REQUEST,
  DELETE_Designation_SUCCESS,
  DELETE_Designation_FAIL,
  ALL_Designation_REQUEST,
  ALL_Designation_SUCCESS,
  ALL_Designation_FAIL,
  UPDATE_Designation_REQUEST,
  UPDATE_Designation_SUCCESS,
  UPDATE_Designation_FAIL,
  ADD_Department_REQUEST,
  ADD_Department_SUCCESS,
  ADD_Department_FAIL,
  UPDATE_Department_REQUEST,
  UPDATE_Department_SUCCESS,
  UPDATE_Department_FAIL,
  ALL_Department_REQUEST,
  ALL_Department_SUCCESS,
  ALL_Department_FAIL,
  DELETE_Department_REQUEST,
  DELETE_Department_SUCCESS,
  DELETE_Department_FAIL,
  ADD_CourseDuration_REQUEST,
  ADD_CourseDuration_SUCCESS,
  ADD_CourseDuration_FAIL,
  UPDATE_CourseDuration_REQUEST,
  UPDATE_CourseDuration_SUCCESS,
  UPDATE_CourseDuration_FAIL,
  ALL_CourseDuration_REQUEST,
  ALL_CourseDuration_SUCCESS,
  ALL_CourseDuration_FAIL,
  DELETE_CourseDuration_REQUEST,
  DELETE_CourseDuration_SUCCESS,
  DELETE_CourseDuration_FAIL,
  ADD_TEST_REQUEST,
  ADD_TEST_SUCCESS,
  ADD_TEST_FAIL,
  ALL_TEST_REQUEST,
  ALL_TEST_SUCCESS,
  ALL_TEST_FAIL,
  DELETE_TEST_REQUEST,
  DELETE_TEST_SUCCESS,
  DELETE_TEST_FAIL,
  UPDATE_TEST_REQUEST,
  UPDATE_TEST_SUCCESS,
  UPDATE_TEST_FAIL,
  UPDATE_CREDENTIALS_REQUEST,
  UPDATE_CREDENTIALS_SUCCESS,
  UPDATE_CREDENTIALS_FAIL,
  UPDATE_RESET_PROFILE_SUCCESS,
  UPDATE_CREDENTIALS_RESET_SUCCESS,
  ALL_STUDENT_TEST_REQUEST,
  ALL_STUDENT_TEST_SUCCESS,
  ALL_STUDENT_TEST_FAIL,
  UPDATE_STUDENT_TEST_REQUEST,
  UPDATE_STUDENT_TEST_SUCCESS,
  UPDATE_STUDENT_TEST_RESET_SUCCESS,
  UPDATE_STUDENT_TEST_FAIL,
  ADD_RECEIPTPREFIX_REQUEST,
  ADD_RECEIPTPREFIX_SUCCESS,
  ADD_RECEIPTPREFIX_FAIL,
  UPDATE_RECEIPTPREFIX_REQUEST,
  UPDATE_RECEIPTPREFIX_SUCCESS,
  UPDATE_RECEIPTPREFIX_FAIL,
  ALL_RECEIPTPREFIX_REQUEST,
  ALL_RECEIPTPREFIX_SUCCESS,
  CLEAR_ERRORS,
  ALL_RECEIPTPREFIX_FAIL,
  ALL_RECEIPTDATA_REQUEST,
  ALL_RECEIPTDATA_SUCCESS,
  GET_SECTION_REQUEST,
  GET_SECTION__SUCCESS,
  GET_SECTION__FAIL,
  GET_SESSION_REQUEST,
  GET_SESSION_SUCCESS,
  GET_SESSION_FAIL,
  ALL_RECEIPTDATA_FAIL,
} from "../constants/commanConstants";

export const getCollegeReducer = (state = { college: {} }, action) => {
  switch (action.type) {
    case ALL_COLLEGE_REQUEST:
      return {
        loading: true,
      };

    case ALL_COLLEGE_SUCCESS:
      return {
        ...state,
        loading: false,
        college: action.payload,
      };

    case ALL_COLLEGE_FAIL:
      return {
        loading: false,
        college: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getCoachingReducer = (state = { coaching: {} }, action) => {
  switch (action.type) {
    case ALL_COACHING_REQUEST:
      return {
        loading: true,
      };

    case ALL_COACHING_SUCCESS:
      return {
        ...state,
        loading: false,
        coaching: action.payload,
      };

    case ALL_COACHING_FAIL:
      return {
        loading: false,
        coaching: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getSchoolReducer = (state = { school: {} }, action) => {
  switch (action.type) {
    case ALL_SCHOOL_REQUEST:
      return {
        loading: true,
      };

    case ALL_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        school: action.payload,
      };

    case ALL_SCHOOL_FAIL:
      return {
        loading: false,
        school: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getClientReducer = (state = { client: {} }, action) => {
  switch (action.type) {
    case ALL_CLIENT_REQUEST:
      return {
        loading: true,
      };

    case ALL_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        client: action.payload,
      };

    case ALL_CLIENT_FAIL:
      return {
        loading: false,
        client: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const addbatchReducer = (state = { batch: [] }, action) => {
  switch (action.type) {
    case ADD_BATCH_REQUEST:
      return {
        loading: true,
      };

    case ADD_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        batch: action.payload,
      };

    case ADD_BATCH_FAIL:
      return {
        loading: false,
        batch: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updatebatchReducer = (state = { batch: [] }, action) => {
  switch (action.type) {
    case UPDATE_BATCH_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        batch: action.payload,
      };

    case UPDATE_BATCH_FAIL:
      return {
        loading: false,
        batch: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getebatchReducer = (state = { batch: [] }, action) => {
  switch (action.type) {
    case ALL_BATCH_REQUEST:
      return {
        loading: true,
      };

    case ALL_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        batch: action.payload,
      };

    case ALL_BATCH_FAIL:
      return {
        loading: false,
        batch: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deletebatchReducer = (state = { batch: [] }, action) => {
  switch (action.type) {
    case DELETE_BATCH_REQUEST:
      return {
        loading: true,
      };

    case DELETE_BATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        batch: action.payload,
      };

    case DELETE_BATCH_FAIL:
      return {
        loading: false,
        batch: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const addcourseReducer = (state = { course: [] }, action) => {
  switch (action.type) {
    case ADD_COURSE_REQUEST:
      return {
        loading: true,
      };

    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        course: action.payload,
      };

    case ADD_COURSE_FAIL:
      return {
        loading: false,
        course: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updatecourseReducer = (state = { course: [] }, action) => {
  switch (action.type) {
    case UPDATE_COURSE_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        course: action.payload,
      };

    case UPDATE_COURSE_FAIL:
      return {
        loading: false,
        course: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getcourseReducer = (state = { course: [] }, action) => {
  switch (action.type) {
    case ALL_COURSE_REQUEST:
      return {
        loading: true,
      };

    case ALL_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        course: action.payload,
      };

    case ALL_COURSE_FAIL:
      return {
        loading: false,
        course: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deletecourseReducer = (state = { course: [] }, action) => {
  switch (action.type) {
    case DELETE_COURSE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        course: action.payload,
      };

    case DELETE_COURSE_FAIL:
      return {
        loading: false,
        course: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const addcategoryReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST:
      return {
        loading: true,
      };

    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };

    case ADD_CATEGORY_FAIL:
      return {
        loading: false,
        category: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updatecategoryReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };

    case UPDATE_CATEGORY_FAIL:
      return {
        loading: false,
        category: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getcategoryReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case ALL_CATEGORY_REQUEST:
      return {
        loading: true,
      };

    case ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };

    case ALL_CATEGORY_FAIL:
      return {
        loading: false,
        category: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deletecategoryReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return {
        loading: true,
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };

    case DELETE_CATEGORY_FAIL:
      return {
        loading: false,
        category: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const addDesignationReducer = (state = { designation: [] }, action) => {
  switch (action.type) {
    case ADD_Designation_REQUEST:
      return {
        loading: true,
      };

    case ADD_Designation_SUCCESS:
      return {
        ...state,
        loading: false,
        designation: action.payload,
      };

    case ADD_Designation_FAIL:
      return {
        loading: false,
        designation: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateDesignationReducer = (
  state = { designation: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_Designation_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_Designation_SUCCESS:
      return {
        ...state,
        loading: false,
        designation: action.payload,
      };

    case UPDATE_Designation_FAIL:
      return {
        loading: false,
        designation: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getcateDesignationReducer = (
  state = { designation: [] },
  action
) => {
  switch (action.type) {
    case ALL_Designation_REQUEST:
      return {
        loading: true,
      };

    case ALL_Designation_SUCCESS:
      return {
        ...state,
        loading: false,
        designation: action.payload,
      };

    case ALL_Designation_FAIL:
      return {
        loading: false,
        designation: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deleteDesignationReducer = (
  state = { designation: [] },
  action
) => {
  switch (action.type) {
    case DELETE_Designation_REQUEST:
      return {
        loading: true,
      };

    case DELETE_Designation_SUCCESS:
      return {
        ...state,
        loading: false,
        designation: action.payload,
      };

    case DELETE_Designation_FAIL:
      return {
        loading: false,
        designation: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const addfeeReducer = (state = { fee: [] }, action) => {
  switch (action.type) {
    case ADD_FEESTRUCTURE_REQUEST:
      return {
        loading: true,
      };

    case ADD_FEESTRUCTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        fee: action.payload,
      };

    case ADD_FEESTRUCTURE_FAIL:
      return {
        loading: false,
        fee: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updatefeeReducer = (state = { fee: [] }, action) => {
  switch (action.type) {
    case UPDATE_FEESTRUCTURE_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_FEESTRUCTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        fee: action.payload,
      };

    case UPDATE_FEESTRUCTURE_FAIL:
      return {
        loading: false,
        fee: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getcatefeeReducer = (state = { fee: [] }, action) => {
  switch (action.type) {
    case ALL_FEESTRUCTURE_REQUEST:
      return {
        loading: true,
      };

    case ALL_FEESTRUCTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        fee: action.payload,
      };

    case ALL_FEESTRUCTURE_FAIL:
      return {
        loading: false,
        fee: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deletefeeReducer = (state = { fee: [] }, action) => {
  switch (action.type) {
    case DELETE_FEESTRUCTURE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_FEESTRUCTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        fee: action.payload,
      };

    case DELETE_FEESTRUCTURE_FAIL:
      return {
        loading: false,
        fee: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const addstudentReducer = (state = { student: [] }, action) => {
  switch (action.type) {
    case ADD_STUDENT_REQUEST:
      return {
        loading: true,
        studentaddstatus: false,
      };

    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        student: action.payload,
        studentaddstatus: true,
      };

    case ADD_STUDENT_RESET:
      return {
        studentaddstatus: false,
      };
    case ADD_STUDENT_FAIL:
      return {
        loading: false,
        student: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updatestudentReducer = (state = { student: [] }, action) => {
  switch (action.type) {
    case UPDATE_STUDENT_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        student: action.payload,
      };

    case UPDATE_STUDENT_FAIL:
      return {
        loading: false,
        student: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getstudentReducer = (state = { student: [] }, action) => {
  switch (action.type) {
    case ALL_STUDENT_REQUEST:
      return {
        loading: true,
      };

    case ALL_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        student: action.payload,
      };

    case ALL_STUDENT_FAIL:
      return {
        loading: false,
        student: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deletestudentReducer = (state = { student: [] }, action) => {
  switch (action.type) {
    case DELETE_STUDENT_REQUEST:
      return {
        loading: true,
      };

    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        student: action.payload,
      };

    case DELETE_STUDENT_FAIL:
      return {
        loading: false,
        student: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const addEmployeeReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case ADD_EMPLOYEETYPE_REQUEST:
      return {
        loading: true,
      };

    case ADD_EMPLOYEETYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };

    case ADD_EMPLOYEETYPE_FAIL:
      return {
        loading: false,
        employees: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateEmployeeReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case UPDATE_EMPLOYEETYPE_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_EMPLOYEETYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };

    case UPDATE_EMPLOYEETYPE_FAIL:
      return {
        loading: false,
        employees: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deleteEmployeeReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEETYPE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_EMPLOYEETYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };

    case DELETE_EMPLOYEETYPE_FAIL:
      return {
        loading: false,
        employees: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getEmployeeReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case ALL_EMPLOYEETYPE_REQUEST:
      return {
        loading: true,
      };

    case ALL_EMPLOYEETYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };

    case ALL_EMPLOYEETYPE_FAIL:
      return {
        loading: false,
        employees: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const addDepartmentReducer = (state = { department: [] }, action) => {
  switch (action.type) {
    case ADD_Department_REQUEST:
      return {
        loading: true,
      };

    case ADD_Department_SUCCESS:
      return {
        ...state,
        loading: false,
        department: action.payload,
      };

    case ADD_Department_FAIL:
      return {
        loading: false,
        department: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateDepartmentReducer = (state = { department: [] }, action) => {
  switch (action.type) {
    case UPDATE_Department_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_Department_SUCCESS:
      return {
        ...state,
        loading: false,
        department: action.payload,
      };

    case UPDATE_Department_FAIL:
      return {
        loading: false,
        department: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getDepartmentReducer = (state = { department: [] }, action) => {
  switch (action.type) {
    case ALL_Department_REQUEST:
      return {
        loading: true,
      };

    case ALL_Department_SUCCESS:
      return {
        ...state,
        loading: false,
        department: action.payload,
      };

    case ALL_Department_FAIL:
      return {
        loading: false,
        department: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deleteDepartmentReducer = (state = { department: [] }, action) => {
  switch (action.type) {
    case DELETE_Department_REQUEST:
      return {
        loading: true,
      };

    case DELETE_Department_SUCCESS:
      return {
        ...state,
        loading: false,
        department: action.payload,
      };

    case DELETE_Department_FAIL:
      return {
        loading: false,
        department: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const addCourseDurationReducer = (
  state = { courseduarion: [] },
  action
) => {
  switch (action.type) {
    case ADD_CourseDuration_REQUEST:
      return {
        loading: true,
      };

    case ADD_CourseDuration_SUCCESS:
      return {
        ...state,
        loading: false,
        courseduarion: action.payload,
      };

    case ADD_CourseDuration_FAIL:
      return {
        loading: false,
        courseduarion: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateCourseDurationReducer = (
  state = { courseduarion: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_CourseDuration_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_CourseDuration_SUCCESS:
      return {
        ...state,
        loading: false,
        courseduarion: action.payload,
      };

    case UPDATE_CourseDuration_FAIL:
      return {
        loading: false,
        courseduarion: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getCourseDurationReducer = (
  state = { courseduarion: [] },
  action
) => {
  switch (action.type) {
    case ALL_CourseDuration_REQUEST:
      return {
        loading: true,
      };

    case ALL_CourseDuration_SUCCESS:
      return {
        ...state,
        loading: false,
        courseduarion: action.payload,
      };

    case ALL_CourseDuration_FAIL:
      return {
        loading: false,
        courseduarion: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deleteCourseDurationReducer = (
  state = { courseduarion: [] },
  action
) => {
  switch (action.type) {
    case DELETE_CourseDuration_REQUEST:
      return {
        loading: true,
      };

    case DELETE_CourseDuration_SUCCESS:
      return {
        ...state,
        loading: false,
        courseduarion: action.payload,
      };

    case DELETE_CourseDuration_FAIL:
      return {
        loading: false,
        courseduarion: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const addTestReducer = (state = { test: [] }, action) => {
  switch (action.type) {
    case ADD_TEST_REQUEST:
      return {
        loading: true,
      };

    case ADD_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        test: action.payload,
      };

    case ADD_TEST_FAIL:
      return {
        loading: false,
        test: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateTestReducer = (state = { test: [] }, action) => {
  switch (action.type) {
    case UPDATE_TEST_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        test: action.payload,
      };

    case UPDATE_TEST_FAIL:
      return {
        loading: false,
        test: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getTestReducer = (state = { test: [] }, action) => {
  switch (action.type) {
    case ALL_TEST_REQUEST:
      return {
        loading: true,
      };

    case ALL_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        test: action.payload,
      };

    case ALL_TEST_FAIL:
      return {
        loading: false,
        test: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deleteTestReducer = (state = { test: [] }, action) => {
  switch (action.type) {
    case DELETE_TEST_REQUEST:
      return {
        loading: true,
      };

    case DELETE_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        test: action.payload,
      };

    case DELETE_TEST_FAIL:
      return {
        loading: false,
        test: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateCredentialsReducer = (
  state = { Credential: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_CREDENTIALS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CREDENTIALS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_CREDENTIALS_RESET_SUCCESS:
      setTimeout(() => {
        return {
          ...state,
          isUpdated: false,
        };
      }, 1000);

    case UPDATE_CREDENTIALS_FAIL:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getStudentTestReducer = (state = { test: [] }, action) => {
  switch (action.type) {
    case ALL_STUDENT_TEST_REQUEST:
      return {
        loading: true,
      };

    case ALL_STUDENT_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        test: action.payload,
      };

    case ALL_STUDENT_TEST_FAIL:
      return {
        loading: false,
        test: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateStudentTestReducer = (state = { result: [] }, action) => {
  console.log('data from addresult action',action.payload);
  switch (action.type) {
    case UPDATE_STUDENT_TEST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_STUDENT_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.payload,
      };
  
   
    case UPDATE_STUDENT_TEST_RESET_SUCCESS:
      setTimeout(() => {
        return {
          ...state,
          result: null,
        };
      }, 1000);

    case UPDATE_STUDENT_TEST_FAIL:
      return {
        ...state,
        result: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const addReceiptFormatReducer = (
  state = { ReceiptFormat: [] },
  action
) => {
  switch (action.type) {
    case ADD_RECEIPTPREFIX_REQUEST:
      return {
        loading: true,
      };

    case ADD_RECEIPTPREFIX_SUCCESS:
      return {
        ...state,
        loading: false,
        ReceiptFormat: action.payload,
      };

    case ADD_RECEIPTPREFIX_FAIL:
      return {
        loading: false,
        ReceiptFormat: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateReceiptFormatReducer = (
  state = { ReceiptFormat: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_RECEIPTPREFIX_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_RECEIPTPREFIX_SUCCESS:
      return {
        ...state,
        loading: false,
        ReceiptFormat: action.payload,
      };

    case UPDATE_RECEIPTPREFIX_FAIL:
      return {
        loading: false,
        ReceiptFormat: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getReceiptFormatReducer = (
  state = { ReceiptFormat: [] },
  action
) => {
  switch (action.type) {
    case ALL_RECEIPTPREFIX_REQUEST:
      return {
        loading: true,
      };

    case ALL_RECEIPTPREFIX_SUCCESS:
      return {
        ...state,
        loading: false,
        ReceiptFormat: action.payload,
      };

    case ALL_RECEIPTPREFIX_FAIL:
      return {
        loading: false,
        ReceiptFormat: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getReceiptPrintReducer = (state = { receiptdata: [] }, action) => {
  switch (action.type) {
    case ALL_RECEIPTDATA_REQUEST:
      return {
        loading: true,
      };

    case ALL_RECEIPTDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        receiptdata: action.payload,
      };

    case ALL_RECEIPTDATA_FAIL:
      return {
        loading: false,
        receiptdata: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};



export const getChoachingMonthlyFeeReducer = (state = { receiptdata: [] }, action) => {
  switch (action.type) {
    case ALL_RECEIPTDATA_REQUEST:
      return {
        loading: true,
      };

    case ALL_RECEIPTDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        receiptdata: action.payload,
      };

    case ALL_RECEIPTDATA_FAIL:
      return {
        loading: false,
        receiptdata: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const GetSection = (state = { sections: {} }, action) => {
  switch (action.type) {
    case GET_SECTION_REQUEST:
      return {
        loading: true,
      };

    case GET_SECTION__SUCCESS:
      return {
        ...state,
        loading: false,
        sections: action.payload,
      };

    case GET_SECTION__FAIL:
      return {
        loading: false,
        sections: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};




export const GetSession = (state = { Sessions: {} }, action) => {
  switch (action.type) {
    case GET_SESSION_REQUEST:
      return {
        loading: true,
      };

    case GET_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        Sessions: action.payload,
      };

    case GET_SESSION_FAIL:
      return {
        loading: false,
        Sessions: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
