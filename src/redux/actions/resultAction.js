import axios from "axios";
import { toast } from "react-toastify";
import { backendApiUrl } from "../../config/config";
import { serverInstance } from "../../API/ServerInstance";

import {

  CLEAR_ERRORS,
} from "../constants/reportConstants";

// Get all Enquiry
export const getPrintReceipt =
  (fromdate, scoursename, sstudent, rollnumber) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("erptoken")}`,
        },
      };
      if (fromdate || scoursename || sstudent || rollnumber) {
        dispatch({ type: ALL_RECEIPTDATA_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}student/getreceiptdata?name=${scoursename}&fromdate=${fromdate}&studentname=${sstudent}&rollnumber=${rollnumber}`,
          config
        );
        dispatch({
          type: ALL_RECEIPTDATA_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: ALL_RECEIPTDATA_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}student/getreceiptdata`,

          config
        );
        dispatch({
          type: ALL_RECEIPTDATA_SUCCESS,
          payload: data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_RECEIPTDATA_FAIL,
        payload: error?.response?.data?.msg,
      });
    }
  };
