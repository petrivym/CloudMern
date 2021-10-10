import logo from '../../assets/img/cloudLogo.png'
import '../navBar/navBar.scss'
import {NavLink} from "react-router-dom";

export default function NavBar() {
    return (
        <div className='navBar'>
            <div className="container">
                <img src={logo} alt="logo" className='navBar__logo'/>
                <div className='navBar__header'>Cloud</div>
                <div className='navBar__login'><NavLink to='/registration'>Registration</NavLink></div>
                <div className='navBar__registration'><NavLink to='/login'>Login</NavLink></div>
            </div>

        </div>
    );
}
