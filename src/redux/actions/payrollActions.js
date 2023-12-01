import axios from "axios";
import { toast } from "react-toastify";
import { backendApiUrl } from "../../config/config";
import { serverInstance } from "../../API/ServerInstance";
import {
  GET_PAYROLL_REQUEST,
  GET_PAYROLL_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/payrollConstants";

// Get all books
export const GetPayRoll = (empid, empname) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: GET_PAYROLL_REQUEST });

    if (empid || empname) {
      const { data } = await axios.get(
        `${backendApiUrl}payroll/payempsalary?empid=${empid}&empname=${empname}`,
        config
      );

      dispatch({
        type: GET_PAYROLL_SUCCESS,
        payload: data?.data,
      });
    } else {
      dispatch({ type: GET_PAYROLL_REQUEST });
      const { data } = await axios.get(
        `${backendApiUrl}payroll/payempsalary`,
        config
      );

      dispatch({
        type: GET_PAYROLL_SUCCESS,
        payload: data?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: CLEAR_ERRORS,
      payload: error?.response?.data?.msg,
    });
  }
};
