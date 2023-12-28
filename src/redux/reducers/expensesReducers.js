import {
  GET_ASSETTYPE_REQUEST,
  GET_ASSETTYPE_SUCCESS,
  GET_ASSETTYPE_FAIL,
  GET_ASSET_REQUEST,
  GET_ASSET_SUCCESS,
  GET_ASSET_FAIL,
  GET_EXPENSESTYPE_REQUEST,
  GET_EXPENSESTYPE_SUCCESS,
  GET_EXPENSESTYPE_FAIL,
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_FAIL,
  GET_TRANSFER_REQUEST,
  GET_TRANSFER_SUCCESS,
  GET_TRANSFERFAIL,
  CLEAR_ERRORS,
} from "../constants/expensesConstants";

export const GetAssetTypReducer = (state = { assettype: {} }, action) => {
  switch (action.type) {
    case GET_ASSETTYPE_REQUEST:
      return {
        loading: true,
      };

    case GET_ASSETTYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        assettype: action.payload,
      };

    case GET_ASSETTYPE_FAIL:
      return {
        loading: false,
        assettype: null,
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

export const GetAssetReducer = (state = { assets: {} }, action) => {
  switch (action.type) {
    case GET_ASSET_REQUEST:
      return {
        loading: true,
      };

    case GET_ASSET_SUCCESS:
      return {
        ...state,
        loading: false,
        assets: action.payload,
      };

    case GET_ASSET_FAIL:
      return {
        loading: false,
        assets: null,
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

export const GetExpensesTypeReducer = (
  state = { expensestype: {} },
  action
) => {
  switch (action.type) {
    case GET_EXPENSESTYPE_REQUEST:
      return {
        loading: true,
      };

    case GET_EXPENSESTYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        expensestype: action.payload,
      };

    case GET_EXPENSESTYPE_FAIL:
      return {
        loading: false,
        expensestype: null,
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

export const GetExpensesReducer = (state = { expenses: {} }, action) => {
  switch (action.type) {
    case GET_EXPENSES_REQUEST:
      return {
        loading: true,
      };

    case GET_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        expenses: action.payload,
      };

    case GET_EXPENSES_FAIL:
      return {
        loading: false,
        expenses: null,
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

export const GetAmountTransferReducer = (
  state = { transferamount: {} },
  action
) => {
  switch (action.type) {
    case GET_TRANSFER_REQUEST:
      return {
        loading: true,
      };

    case GET_TRANSFER_SUCCESS:
      return {
        ...state,
        loading: false,
        transferamount: action.payload,
      };

    case GET_TRANSFERFAIL:
      return {
        loading: false,
        transferamount: null,
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
