import axios from "axios";
import {setUser} from "../reducers/actionCreators/userActionCreators";

export const registrationUser = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/auth/registration`, {email, password});
        console.log(response.data);
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const loginUser = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/auth/login`, {email, password});
            dispatch(setUser(response.data.user));
            localStorage.setItem('tokens', JSON.stringify(response.data.tokensPair))
        } catch (e) {
            console.log(e);
        }
    }


}

export const checkLoginUser = () => {
    return async dispatch => {
        try {
            const Tokens = JSON.parse(localStorage.getItem('tokens'))

            const response = await axios.get(`http://localhost:5000/auth`, {headers: {Authorization: `Bearer ${Tokens.accessToken}`}});
            console.log(response, "***************");
            dispatch(setUser(response.data.user));

            localStorage.setItem('tokens', JSON.stringify(response.data.tokensPair));
        } catch (e) {
            console.log(e);
            // localStorage.removeItem('tokens');
        }
    }
}



