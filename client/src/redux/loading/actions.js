import LoadingActionTypes from "./actionTypes";

export function clearLoading(type) {
  return (dispatch) => {
    if (Array.isArray(type)) {
      type.map(item => {
        dispatch({ type: LoadingActionTypes.CLEAR_LOADING, loadingType: item });
      })
    } else {
      dispatch({ type: LoadingActionTypes.CLEAR_LOADING, loadingType: type });
    }
  }
}