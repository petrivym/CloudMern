import './registaration.scss'
import Input from "../input/Input";
import {useState} from "react";
import {loginUser} from "../../actions/user";
import {useDispatch} from "react-redux";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    return (
        <div className='registration'>
            <div className="registration__header">Login</div>
            <Input value={email} setValue={setEmail} type="email" placeHolder="Enter email..."/>
            <Input value={password} setValue={setPassword} type="password" placeHolder="Enter password..."/>
            <button className="registration__btn" onClick={() => dispatch(loginUser(email, password))}>Sig in</button>
        </div>
    );
}
