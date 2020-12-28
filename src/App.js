import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import Home from './components/home';
import Login from "./components/login";
import Dashboard from "./components/dashboard";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <div className="header">
                        <NavLink exact activeClassName="active" to="/">Home</NavLink>
                        <NavLink activeClassName="active" to="/login">Login</NavLink>
                        <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/dashboard" component={Dashboard}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
