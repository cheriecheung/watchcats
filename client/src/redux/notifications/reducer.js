import Immutable from 'seamless-immutable';
import NotificationsActionTypes from './actionTypes'

const initialState = Immutable({
  hasUnreadBookings: false,
  unreadBookingsAsOwner: {},
  unreadBookingsAsSitter: {},
  hasUnreadChats: false,
})

const notifications_reducer = {
  notifications: (state = initialState, action) => {
    switch (action.type) {
      case NotificationsActionTypes.GET_NOTIFICATIONS:
        return {
          ...state,
          hasUnreadBookings: action.payload.hasUnreadBookings,
          unreadBookingsAsOwner: action.payload.unreadBookingsAsOwner,
          unreadBookingsAsSitter: action.payload.unreadBookingsAsSitter,
          hasUnreadChats: action.payload.hasUnreadChats,
        }
      case NotificationsActionTypes.SET_READ_AS_OWNER:
        return { ...state, unreadBookingsAsOwner: action.payload.remainingUnread }
      case NotificationsActionTypes.SET_READ_AS_SITTER:
        return { ...state, unreadBookingsAsSitter: action.payload.remainingUnread }
      case NotificationsActionTypes.SET_ALL_BOOKINGS_AS_READ:
        return {
          ...state,
          hasUnreadBookings: false,
          unreadBookingsAsOwner: {},
          unreadBookingsAsSitter: {}
        }
      default:
        return state;
    }
  }
}

export default notifications_reducer;