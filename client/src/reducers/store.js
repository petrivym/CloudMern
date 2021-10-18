import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import fileReducer from "./reducers/fileReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
    fileReducer: fileReducer,
    userReducer: userReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
