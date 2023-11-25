import {
  GET_HOSTEL_SUCCESS,
  GET_HOSTEL_REQUEST,
  GET_HOSTEL_FAIL,
  GET_ROOM_CATEGORY_FAIL,
  GET_ROOM_CATEGORY_SUCCESS,
  GET_ROOM_CATEGORY_REQUEST,
  GET_ROOM_FACILITY_REQUEST,
  GET_ROOM_FACILITY_SUCCESS,
  GET_ROOM_FACILITY_FAIL,
  GET_ROOM_REQUEST,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL,
  CLEAR_ERRORS,
} from "../constants/hostelConstants";

export const GetCategory = (state = { roomcategory: {} }, action) => {
  switch (action.type) {
    case GET_ROOM_CATEGORY_REQUEST:
      return {
        loading: true,
      };

    case GET_ROOM_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        roomcategory: action.payload,
      };

    case GET_ROOM_CATEGORY_FAIL:
      return {
        loading: false,
        roomcategory: null,
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

export const GetFacility = (state = { roomfacility: {} }, action) => {
  switch (action.type) {
    case GET_ROOM_FACILITY_REQUEST:
      return {
        loading: true,
      };

    case GET_ROOM_FACILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        roomfacility: action.payload,
      };

    case GET_ROOM_FACILITY_FAIL:
      return {
        loading: false,
        roomfacility: null,
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

export const GetHostel = (state = { hostel: {} }, action) => {
  switch (action.type) {
    case GET_HOSTEL_REQUEST:
      return {
        loading: true,
      };

    case GET_HOSTEL_SUCCESS:
      return {
        ...state,
        loading: false,
        hostel: action.payload,
      };

    case GET_HOSTEL_FAIL:
      return {
        loading: false,
        hostel: null,
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

export const GetRoom = (state = { room: {} }, action) => {
  switch (action.type) {
    case GET_ROOM_REQUEST:
      return {
        loading: true,
      };

    case GET_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        room: action.payload,
      };

    case GET_ROOM_FAIL:
      return {
        loading: false,
        room: null,
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
