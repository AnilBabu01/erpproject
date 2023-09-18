import {
  ALL_ENQUIRY_REQUEST,
  ALL_ENQUIRY_SUCCESS,
  ALL_ENQUIRY_FAIL,
  ADD_ENQUIRY_REQUEST,
  ADD_ENQUIRY_SUCCESS,
  ADD_ENQUIRY_FAIL,
  UPDATE_ENQUIRY_REQUEST,
  UPDATE_ENQUIRY_SUCCESS,
  UPDATE_ENQUIRY_FAIL,
  DELETE_ENQUIRY_REQUEST,
  DELETE_ENQUIRY_SUCCESS,
  DELETE_ENQUIRY_FAIL,
  FILTER_ENQUIRY_REQUEST,
  FILTER__ENQUIRY_SUCCESS,
  FILTER__ENQUIRY_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_RESET_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  ADD_PAYCOACHINGFEE_REQUEST,
  ADD_PAYCOACHINGFEE_SUCCESS,
  ADD_PAYCOACHINGFEE_FAIL,
  CLEAR_ERRORS,
} from "../constants/coachingContants";

export const addenquiryReducer = (state = { enquiry: [] }, action) => {
  switch (action.type) {
    case ADD_ENQUIRY_REQUEST:
      return {
        loading: true,
      };

    case ADD_ENQUIRY_SUCCESS:
      return {
        ...state,
        loading: false,
        enquiry: action.payload,
      };

    case ADD_ENQUIRY_FAIL:
      return {
        loading: false,
        enquiry: null,
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

export const updateenquiryReducer = (state = { enquiry: [] }, action) => {
  switch (action.type) {
    case UPDATE_ENQUIRY_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_ENQUIRY_SUCCESS:
      return {
        ...state,
        loading: false,
        enquiry: action.payload,
      };

    case UPDATE_ENQUIRY_FAIL:
      return {
        loading: false,
        enquiry: null,
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

export const getenquiriesReducer = (state = { enquiry: [] }, action) => {
  switch (action.type) {
    case FILTER_ENQUIRY_REQUEST:
    case ALL_ENQUIRY_REQUEST:
      return {
        loading: true,
      };
    case FILTER__ENQUIRY_SUCCESS:
    case ALL_ENQUIRY_SUCCESS:
      return {
        ...state,
        loading: false,
        enquiry: action.payload,
      };
    case FILTER__ENQUIRY_FAIL:
    case ALL_ENQUIRY_FAIL:
      return {
        loading: false,
        enquiry: null,
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

export const deletequiryReducer = (state = { enquiry: [] }, action) => {
  switch (action.type) {
    case DELETE_ENQUIRY_REQUEST:
      return {
        loading: true,
      };

    case DELETE_ENQUIRY_SUCCESS:
      return {
        ...state,
        loading: false,
        enquiry: action.payload,
      };

    case DELETE_ENQUIRY_FAIL:
      return {
        loading: false,
        enquiry: null,
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

export const updateprofileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_RESET_PROFILE_SUCCESS:
      setTimeout(() => {
        return {
          ...state,
          isUpdated: false,
        };
      }, 1000);

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        isUpdated: false,
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

export const addpayfeeReducer = (state = { paycoaching: [] }, action) => {
  switch (action.type) {
    case ADD_PAYCOACHINGFEE_REQUEST:
      return {
        loading: true,
      };

    case ADD_PAYCOACHINGFEE_SUCCESS:
      return {
        ...state,
        loading: false,
        paycoaching: action.payload,
      };

    case ADD_PAYCOACHINGFEE_FAIL:
      return {
        loading: false,
        paycoaching: null,
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
