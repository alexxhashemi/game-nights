import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Users from './component/Users';
import Appointments from './component/Appointments';
import { Outlet, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./App.css";

function App() {
  const [cookies, setCookies, removeCookie] = useCookies(['user']);
  console.log(cookies);

  const logout = function() {
    removeCookie('user');
    window.location.href = '/';
  }
  
  return (
    <div className="App" >


      <nav
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "solid 1px",
          fontSize: "1.3em",
          fontWeight: "bold",
        }}
        >
       
         {cookies.user ? 
        <>
        <Link to="/appointments" style={{ textDecoration: 'none', margin: '15px 25px'}} >Appointments</Link>
        <Link to="/users" style={{ textDecoration: 'none', margin: '15px 25px'}}>Users</Link>
        {/* <Link to="/rooms" style={{ textDecoration: 'none', margin: '15px 25px'}}>Rooms</Link> */}
        <Link to="/host" style={{ textDecoration: 'none', margin: '15px 25px'}}>Host</Link>
        <button className= "logout" style={{ textDecoration: 'none', margin: '15px 3em'}}type="submit" onClick={logout}>Logout</button>
        </> :
        <>
        <Link to="/appointments" style={{ textDecoration: 'none', margin: '15px 25px'}}>Appointments</Link>
        <Link to="/login" style={{ textDecoration: 'none', margin: '15px 25px'}}>Login</Link>
        <Link to="/register" style={{ textDecoration: 'none', margin: '15px 25px'}}>Register</Link>
        </>
        }
        
        
      </nav>
      
      <Outlet />
      
    </div>
  );
}

export default App;
