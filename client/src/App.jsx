import NavBar from "./components/navBar/NavBar";
import "./app.scss"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/authorization/Authorization";
import Login from "./components/authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkLoginUser} from "./actions/user";

function App() {
    const {isAuth} = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkLoginUser());
    }, [])

    return (
        <BrowserRouter>
            <div className='app'>
                <NavBar/>
                <div className="wrap">
                    {
                        !isAuth && <Switch>
                            <Route path="/auth/registration"
                                   render={(props) => <Registration/>}/>
                            <Route path="/auth/login"
                                   render={(props) => <Login/>}/>
                        </Switch>
                    }

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
