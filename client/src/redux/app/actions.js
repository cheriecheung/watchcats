import AppActionTypes from './actionTypes'

export function changeLanguage(i18n, language) {
  return (dispatch) => {
    i18n.changeLanguage(language, () => {
      dispatch({
        type: AppActionTypes.CHANGE_LANGUAGE,
        payload: language,
      });
    });
  };
}

export function toggleMobileMenu(isOpen) {
  return (dispatch) => {
    dispatch({
      type: AppActionTypes.TOGGLE_MOBILE_MENU,
      payload: isOpen
    });
  };
}