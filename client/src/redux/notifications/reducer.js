import Immutable from 'seamless-immutable';
import NotificationsActionTypes from './actionTypes'

const initialState = Immutable({
  hasUnreadBookings: false,
  unreadBookingsAsOwner: {},
  unreadBookingsAsSitter: {},
  hasUnreadChats: false,
  unreadChats: []
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
          unreadChats: action.payload.unreadChats
        }
      case NotificationsActionTypes.UPDATE_BOOKING_NOTIFICATIONS:
        return {
          ...state,
          hasUnreadBookings: action.payload.hasUnreadBookings,
          unreadBookingsAsOwner: action.payload.unreadBookingsAsOwner,
          unreadBookingsAsSitter: action.payload.unreadBookingsAsSitter
        }
      case NotificationsActionTypes.UPDATE_CHAT_NOTIFICATIONS: {
        return {
          ...state,
          hasUnreadChats: action.payload.hasUnreadChats,
          unreadChats: action.payload.unreadChats
        }
      }
      default:
        return state;
    }
  }
}

export default notifications_reducer;