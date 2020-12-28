import ErrorActionTypes from "./actionTypes";

export function clearError(type) {
  return (dispatch) => {
    if (Array.isArray(type)) {
      type.map(item => {
        dispatch({ type: ErrorActionTypes.CLEAR_ERROR, errorType: item });
      })
    } else {
      dispatch({ type: ErrorActionTypes.CLEAR_ERROR, errorType: type });
    }
  }
}

export function clearAllErrors() {
  return (dispatch) => {
    dispatch({ type: ErrorActionTypes.CLEAR_ALL_ERRORS });
  }
}