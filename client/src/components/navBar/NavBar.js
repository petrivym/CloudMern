import logo from '../../assets/img/cloudLogo.png'
import '../navBar/navBar.scss'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../reducers/actionCreators/userActionCreators";

export default function NavBar() {
    const {isAuth} = useSelector(state => state.userReducer);

    const dispatch = useDispatch()

    return (
        <div className='navBar'>
            <div className="container navBar__container">
                <div className="navBar__logo">
                    <img src={logo} alt="logo" className='navBar__logo'/>
                    <div className='navBar__header'>Cloud</div>
                </div>

                <div className='navBar__button'>
                    {

                        !isAuth &&
                        <div><NavLink to="/auth/registration">Registration</NavLink></div>
                    }
                    {
                        !isAuth && <div><NavLink to="/auth/login">Login</NavLink></div>
                    }
                    {
                        isAuth && <div onClick={() => dispatch(logoutUser())}>logout</div>
                    }
                </div>

            </div>

        </div>
    );
}
