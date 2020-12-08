import ErrorTypes from "./actionTypes";

export function clearError(type) {
  return (dispatch) => {
    dispatch({ type: ErrorTypes.CLEAR_ERROR, errorType: type });
  }
}