
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