import ErrorTypes from "./actionTypes";

export function clearError(type) {
  return (dispatch) => {
    if (Array.isArray(type)) {
      type.map(item => {
        dispatch({ type: ErrorTypes.CLEAR_ERROR, errorType: item });
      })
    } else {
      dispatch({ type: ErrorTypes.CLEAR_ERROR, errorType: type });
    }
  }
}

export function clearAllErrors() {
  return (dispatch) => {
    dispatch({ type: ErrorTypes.CLEAR_ALL_ERRORS });
  }
}