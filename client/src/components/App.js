import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Auth from "../hoc/auth";

import "bootstrap/dist/css/bootstrap.min.css";

// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"

import AddTutorial from "./AddTutorial";
import Tutorial from "./Tutorial";
import TutorialsList from "./TutorialsList";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '20px', minHeight: 'calc(100vh - 80px)' }}>
      <div className="container mt-3">
        <Switch>
        <Route exact path="/tutorials" component={Auth(TutorialsList, true)} />
          <Route exact path="/add" component={Auth(AddTutorial, true)} />
          <Route path="/tutorials/:id" component={Tutorial} />

          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
