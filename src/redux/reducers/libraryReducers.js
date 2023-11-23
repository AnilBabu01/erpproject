import {
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAIL,
  CLEAR_ERRORS,
} from "../constants/libraryConstants";

export const GetBooks = (state = { books: {} }, action) => {
  switch (action.type) {
    case GET_BOOK_REQUEST:
      return {
        loading: true,
      };

    case GET_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload,
      };

    case GET_BOOK_FAIL:
      return {
        loading: false,
        books: null,
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
