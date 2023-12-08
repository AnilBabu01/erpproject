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
export const GetPayRoll =
  (empid, empname, sessionname, fromdate, todate) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("erptoken")}`,
        },
      };
      dispatch({ type: GET_PAYROLL_REQUEST });

      if (empid || empname || sessionname || fromdate || todate) {
        const { data } = await axios.get(
          `${backendApiUrl}payroll/payempsalary?empid=${empid}&empname=${empname}&sessionname=${sessionname}&fromdate=${fromdate}&todate=${todate}`,
          config
        );

        dispatch({
          type: GET_PAYROLL_SUCCESS,
          payload: data?.data,
        });
      } else {
        let date = new Date();
        let fullyear = date.getFullYear();
        let lastyear = date.getFullYear() - 1;
        let session =`${lastyear}-${fullyear}`
        dispatch({ type: GET_PAYROLL_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}payroll/payempsalary?sessionname=${session}`,
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
