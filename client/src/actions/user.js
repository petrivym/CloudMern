import axios from "axios";

export const registrationUser = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/auth/registration`, {email, password});
        console.log(response.data);
    } catch (e) {
        console.log(e.response.data.message);
    }
}

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/auth/login`, {email, password});
        console.log(response.data);
    } catch (e) {
        console.log(e.response.data.message);
    }
}



