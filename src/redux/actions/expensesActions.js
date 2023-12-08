import axios from "axios";
import { toast } from "react-toastify";
import { backendApiUrl } from "../../config/config";
import { serverInstance } from "../../API/ServerInstance";
import {
  GET_ASSETTYPE_REQUEST,
  GET_ASSETTYPE_SUCCESS,
  GET_ASSET_REQUEST,
  GET_ASSET_SUCCESS,
  GET_EXPENSESTYPE_REQUEST,
  GET_EXPENSESTYPE_SUCCESS,
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/expensesConstants";

// Get all books
export const GetAssetType =
  (courseorclass, BookId, auther) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("erptoken")}`,
        },
      };
      dispatch({ type: GET_ASSETTYPE_REQUEST });

      if (courseorclass || BookId || auther) {
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addassettype?courseorclass=${courseorclass}&BookId=${BookId}&auther=${auther}`,
          config
        );

        dispatch({
          type: GET_ASSETTYPE_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: GET_ASSETTYPE_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addassettype`,
          config
        );

        dispatch({
          type: GET_ASSETTYPE_SUCCESS,
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

// Get all books
export const GetAsset =
  (fromdate, todate, assettypename) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("erptoken")}`,
        },
      };
      dispatch({ type: GET_ASSET_REQUEST });

      if (fromdate || todate || assettypename) {
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addasset?fromdate=${fromdate}&todate=${todate}&assettypename=${assettypename}`,
          config
        );

        dispatch({
          type: GET_ASSET_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: GET_ASSET_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addasset`,
          config
        );

        dispatch({
          type: GET_ASSET_SUCCESS,
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

// Get all books
export const GetExpensesType =
  (courseorclass, BookId, auther) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("erptoken")}`,
        },
      };
      dispatch({ type: GET_EXPENSESTYPE_REQUEST });

      if (courseorclass || BookId || auther) {
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addexpensestype?courseorclass=${courseorclass}&BookId=${BookId}&auther=${auther}`,
          config
        );

        dispatch({
          type: GET_EXPENSESTYPE_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: GET_EXPENSESTYPE_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addexpensestype`,
          config
        );

        dispatch({
          type: GET_EXPENSESTYPE_SUCCESS,
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

// Get all books
export const GetExpenses =
  (fromdate, todate, Expensestype) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("erptoken")}`,
        },
      };
      dispatch({ type: GET_EXPENSES_REQUEST });

      if (fromdate || todate || Expensestype) {
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addexpenses?fromdate=${fromdate}&todate=${todate}&expensestype=${Expensestype}`,
          config
        );

        dispatch({
          type: GET_EXPENSES_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: GET_EXPENSES_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addexpenses`,
          config
        );

        dispatch({
          type: GET_EXPENSES_SUCCESS,
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
