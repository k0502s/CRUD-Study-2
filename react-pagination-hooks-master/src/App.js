import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              MEMBER LIST
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              LOGIN
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              JOIN
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              ADD
            </Link>
          </li>
          
        
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/tutorials" component={Auth(TutorialsList, true)} />
          <Route exact path="/add" component={Auth(AddTutorial, true)} />
          <Route path="/tutorials/:id" component={Tutorial} />

          <Route exact path="/" component={Auth(LandingPage, null )  } />
          <Route exact path="/login" component={Auth(LoginPage, false) } />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
