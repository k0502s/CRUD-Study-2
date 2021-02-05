import React, { useState } from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import './Sections/Navbar.css';

function NavBar(props) {
  
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark" 
      style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
        <div className="navbar-nav mr-auto">
        
        <li className="nav-item">
        <a href="/" class="navbar-brand">
          Main
        </a>
      </li>
        <li className="nav-item">
        <a href="/tutorials" className="nav-link">
          MEMBER LIST
        </a>
      </li>
          </div>
          <ul class="nav navbar-nav navbar-right">
          <li class="nav-item" >
          <a href="/login" class="nav-link">LOGIN</a>
          </li>
          <li class="nav-item">
          <a href="/register" class="nav-link">JOIN</a>
          </li>
          </ul>
          </nav>

    )
  } else {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark" 
      style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
         <div className="navbar-nav mr-auto">
         
         <li className="nav-item">
        <a href="/" class="navbar-brand">
          Main
        </a>
      </li>
         <li className="nav-item">
        <a href="/tutorials" className="nav-link">
          MEMBER LIST
        </a>
      </li>
     </div>
     <ul class="nav navbar-nav navbar-right">
           <li className="nav-item">
          <a onClick={logoutHandler} className="nav-link">Logout</a>
          </li>
     </ul>    
     </nav>
      
    )
  }
}

export default withRouter(NavBar)