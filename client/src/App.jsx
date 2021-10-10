import NavBar from "./components/navBar/NavBar";
import "./app.scss"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/registration/Registration";

function App() {
    return (
        <BrowserRouter>
            <div className='app'>
                <NavBar/>
                <div className="wrap">
                    <Switch>
                        <Route path="/registration" render={(props) => <Registration props={props}/>}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
