import axios from "axios";
import { toast } from "react-toastify";
import { backendApiUrl } from "../../config/config";
import {
  MARK_ATTENDANCE_REQUEST,
  MARK_ATTENDANCE_SUCCESS,
  MARK_ATTENDANCE_FAIL,
  DONE_ATTENDANCE_REQUEST,
  DONE_ATTENDANCE_SUCCESS,
  MONTHLY_ATTENDANCE_REQUEST,
  MONTHLY__ATTENDANCE_SUCCESS,
  MONTHLY__ATTENDANCE_FAIL,
  DONE_ATTENDANCE_FAIL,
} from "../constants/attendanceConstants";

export const MarkStudentAttendance = (date, batch) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: MARK_ATTENDANCE_REQUEST });
    const { data } = await axios.post(
      `${backendApiUrl}attendanceatudent/attendance`,
      {
        Attendancedate: date,
        batch: batch,
      },
      config
    );

    console.log("search", date, batch);
    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
    }

    dispatch({
      type: MARK_ATTENDANCE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: MARK_ATTENDANCE_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

export const DoneStudentAttendance = (udata) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: DONE_ATTENDANCE_REQUEST });
    const { data } = await axios.put(
      `${backendApiUrl}attendanceatudent/attendance`,
      {
        data: udata,
      },
      config
    );
    console.log("Done Attendance is ", data);
    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
    }

    dispatch({
      type: DONE_ATTENDANCE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: DONE_ATTENDANCE_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};

export const MonthlyStudentAttendance = (udata, months) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: MONTHLY_ATTENDANCE_REQUEST });
    const { data } = await axios.post(
      `${backendApiUrl}attendanceatudent/analysisattendance`,
      {
        batch: udata,
        month: months,
      },
      config
    );

    if (data?.status) {
      toast.success(data?.msg, {
        autoClose: 1000,
      });
    }

    dispatch({
      type: MONTHLY__ATTENDANCE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: MONTHLY__ATTENDANCE_FAIL,
      payload: error?.response?.data?.msg,
    });
    toast.error(error?.response?.data?.msg, { autoClose: 1000 });
  }
};
