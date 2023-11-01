

import {
  ALL_COACHINGMONTHLYFEE_REQUEST,
  ALL_COACHINGMONTHLYFEE_SUCCESS,
  ALL_COACHINGMONTHLYFEE_FAIL,
  CLEAR_ERRORS
} from "../constants/reportConstants";

export const getChoachingMonthlyFeeReducer = (state = {monthlyFee: [] }, action) => {
  switch (action.type) {
    case ALL_COACHINGMONTHLYFEE_REQUEST:
      return {
        loading: true,
      };

    case ALL_COACHINGMONTHLYFEE_SUCCESS:
      return {
        ...state,
        loading: false,
        monthlyFee: action.payload,
      };

    case ALL_COACHINGMONTHLYFEE_FAIL:
      return {
        loading: false,
        monthlyFee: null,
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

  
