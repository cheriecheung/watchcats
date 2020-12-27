import LoadingTypes from "./actionTypes";

export function clearLoading(type) {
  return (dispatch) => {
    if (Array.isArray(type)) {
      type.map(item => {
        dispatch({ type: LoadingTypes.CLEAR_LOADING, loadingType: item });
      })
    } else {
      dispatch({ type: LoadingTypes.CLEAR_LOADING, loadingType: type });
    }
  }
}