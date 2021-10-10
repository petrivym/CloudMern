import {useState} from "react";

export const WithRegistrationAndLogin = (Component) => {
    function RegistrationLogin() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");


        return (
            <Component {...props}/>
        );
    }

    return RegistrationLogin
}
