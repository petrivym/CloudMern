import {SET_USER} from "../actionTypes";
import {LOGOUT_USER} from "../actionTypes";


const defaultState = {
    currentUser: {},
    isAuth: false
}


export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER :
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT_USER :
            localStorage.removeItem('tokens')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }

        default:
            return state
    }
}
