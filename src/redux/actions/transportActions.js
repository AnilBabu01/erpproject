import axios from "axios";
import { toast } from "react-toastify";
import { backendApiUrl } from "../../config/config";
import { serverInstance } from "../../API/ServerInstance";
import {
  GET_ROUTES_REQUEST,
  GET_ROUTES_SUCCESS,
  GET_ROUTES_FAIL,
  GET_VEHICLEDETAILS_REQUEST,
  GET_VEHICLEDETAILS_SUCCESS,
  GET_VEHICLEDETAILS_FAIL,
  GET_VEHICLE_TYPE_REQUEST,
  GET_VEHICLE_TYPE_SUCCESS,
  GET_VEHICLE_TYPE_FAIL,
  CLEAR_ERRORS,
} from "../constants/transportConstants";

// Get all Category
export const GetVehicle = (categoryname) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: GET_VEHICLEDETAILS_REQUEST });

    if (categoryname) {
      const { data } = await axios.get(
        `${backendApiUrl}transport/vehicledetails?categoryname=${categoryname}`,
        config
      );

      dispatch({
        type: GET_VEHICLEDETAILS_SUCCESS,
        payload: data?.data,
      });
    } else {
      dispatch({ type: GET_VEHICLEDETAILS_REQUEST });
      const { data } = await axios.get(
        `${backendApiUrl}transport/vehicledetails`,
        config
      );

      dispatch({
        type: GET_VEHICLEDETAILS_SUCCESS,
        payload: data?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_VEHICLEDETAILS_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

// Get all Facility
export const GetVehicleType = (facilityname) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: GET_VEHICLE_TYPE_REQUEST });

    if (facilityname) {
      const { data } = await axios.get(
        `${backendApiUrl}transport/vehicletype?facilityname=${facilityname}`,
        config
      );
      console.log("get book list from actions", data?.data);
      dispatch({
        type: GET_VEHICLE_TYPE_SUCCESS,
        payload: data?.data,
      });
    } else {
      dispatch({ type: GET_VEHICLE_TYPE_REQUEST });
      const { data } = await axios.get(
        `${backendApiUrl}transport/vehicletype`,
        config
      );

      dispatch({
        type: GET_VEHICLE_TYPE_SUCCESS,
        payload: data?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_VEHICLE_TYPE_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

// Get all Facility
export const GetRoute = (hostelname) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("erptoken")}`,
      },
    };
    dispatch({ type: GET_ROUTES_REQUEST });

    if (hostelname) {
      const { data } = await axios.get(
        `${backendApiUrl}transport/vehicleroute?hostelname=${hostelname}`,
        config
      );

      dispatch({
        type: GET_ROUTES_SUCCESS,
        payload: data?.data,
      });
    } else {
      dispatch({ type: GET_ROUTES_REQUEST });
      const { data } = await axios.get(
        `${backendApiUrl}transport/vehicleroute`,
        config
      );

      dispatch({
        type: GET_ROUTES_SUCCESS,
        payload: data?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ROUTES_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};
