import {
  GET_PAYROLL_REQUEST,
  GET_PAYROLL_SUCCESS,
  GET_PAYROLL_FAIL,
  CLEAR_ERRORS,
} from "../constants/payrollConstants";

export const GetPayRoll = (state = { payroll: {} }, action) => {
  switch (action.type) {
    case GET_PAYROLL_REQUEST:
      return {
        loading: true,
      };

    case GET_PAYROLL_SUCCESS:
      return {
        ...state,
        loading: false,
        payroll: action.payload,
      };

    case GET_PAYROLL_FAIL:
      return {
        loading: false,
        payroll: null,
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
