import {useState} from "react";
import './registaration.scss'
import Input from "../input/Input";
import {registrationUser} from "../../actions/user";

export default function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='registration'>
            <div className="registration__header">Registration</div>
            <Input value={email} setValue={setEmail} type="email" placeHolder="Enter email..."/>
            <Input value={password} setValue={setPassword} type="password" placeHolder="Enter password..."/>
                <button className="registration__btn" onClick={() => registrationUser(email,password)}>Sig in</button>
        </div>
    );
}
