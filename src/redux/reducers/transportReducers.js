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

export const GetVehicleType = (state = { vehicletype: {} }, action) => {
  switch (action.type) {
    case GET_VEHICLE_TYPE_REQUEST:
      return {
        loading: true,
      };

    case GET_VEHICLE_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicletype: action.payload,
      };

    case GET_VEHICLE_TYPE_FAIL:
      return {
        loading: false,
        vehicletype: null,
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

export const GetVehicle = (state = { Vehicle: {} }, action) => {
  switch (action.type) {
    case GET_VEHICLEDETAILS_REQUEST:
      return {
        loading: true,
      };

    case GET_VEHICLEDETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        Vehicle: action.payload,
      };

    case GET_VEHICLEDETAILS_FAIL:
      return {
        loading: false,
        Vehicle: null,
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

export const GetRoute = (state = { route: {} }, action) => {
  switch (action.type) {
    case GET_ROUTES_REQUEST:
      return {
        loading: true,
      };

    case GET_ROUTES_SUCCESS:
      return {
        ...state,
        loading: false,
        route: action.payload,
      };

    case GET_ROUTES_FAIL:
      return {
        loading: false,
        route: null,
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
