import {
  MARK_ATTENDANCE_REQUEST,
  MARK_ATTENDANCE_SUCCESS,
  MARK_ATTENDANCE_FAIL,
  DONE_ATTENDANCE_REQUEST,
  DONE_ATTENDANCE_SUCCESS,
  DONE_ATTENDANCE_FAIL,
  MONTHLY_ATTENDANCE_REQUEST,
  MONTHLY__ATTENDANCE_SUCCESS,
  MONTHLY__ATTENDANCE_FAIL,
  CLEAR_ERRORS,
} from "../constants/attendanceConstants";

export const MarkAttendanceReducer = (
  state = { doneattendance: [] },
  action
) => {
  switch (action.type) {
    case MARK_ATTENDANCE_REQUEST:
      return {
        Markloading: true,
      };

    case MARK_ATTENDANCE_SUCCESS:
      return {
        ...state,
        Markloading: false,
        markattendance: action.payload,
      };

    case MARK_ATTENDANCE_FAIL:
      return {
        Markloading: false,
        markattendance: null,
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

export const DoneAttendanceReducer = (
  state = { markattendance: [] },
  action
) => {
  switch (action.type) {
    case DONE_ATTENDANCE_REQUEST:
      return {
        doneloading: true,
      };

    case DONE_ATTENDANCE_SUCCESS:
      return {
        ...state,
        doneloading: false,
        markattendance: action.payload,
      };

    case DONE_ATTENDANCE_FAIL:
      return {
        doneloading: false,
        markattendance: null,
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

export const MonthlyAttendanceReducer = (
  state = { monthlyattendance: [] },
  action
) => {
  switch (action.type) {
    case MONTHLY_ATTENDANCE_REQUEST:
      return {
        monthlyloading: true,
      };

    case MONTHLY__ATTENDANCE_SUCCESS:
      return {
        ...state,
        monthlyloading: false,
        monthlyattendance: action.payload,
      };

    case MONTHLY__ATTENDANCE_FAIL:
      return {
        monthlyloading: false,
        monthlyattendance: null,
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
