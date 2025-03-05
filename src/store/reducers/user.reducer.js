import { userService } from "../../services/user.service.js"
export const SET_USER = 'SET_USER'
export const SET_USER_DETAILS = 'SET_USER_DETAILS'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'
export const ADD_USER_ACTIVITY = 'ADD_USER_ACTIVITY'
const initialState = {
  loggedInUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_USER:
      return {
        ...state,
        loggedInUser: cmd.user
      }

    case SET_USER_BALANCE:
      {
        const updatedUserBalance = {
          ...state.loggedInUser,
          balance: cmd.balance
        }
        return {
          ...state,
          loggedInUser: updatedUserBalance
        }
      }

    case SET_USER_DETAILS:

      {
        const updatedUserDetails = {
          ...state.loggedInUser,
          ...cmd.updatedUser
        }
        return {
          ...state,
          loggedInUser: updatedUserDetails
        }
      }

    case ADD_USER_ACTIVITY:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          activities: [
            cmd.newActivity, ...(state.loggedInUser.activities || [])
          ]
        }
      };

    default:
      return state
  }

}