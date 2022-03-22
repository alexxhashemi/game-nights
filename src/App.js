import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Users from './component/Users';
import Appointments from './component/Appointments';
import { Outlet, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import useLocalStorage from "use-local-storage";
import "./App.css";

function App() {
  const [cookies, setCookies, removeCookie] = useCookies(['user']);
  console.log(cookies);

  const logout = function() {
    removeCookie('user');
    window.location.href = '/';
  }
  
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    console.log("test")
  };
  
  return (
    <div className="App" data-theme={theme}>

    {/* <h5>Theme Mode</h5>
      <i onClick={switchTheme} className="fas fa-toggle-on"></i> */}

      <nav
        style={{
          background: "black",
          display: "flex",
          alignItems: "center",
          borderBottom: "solid 1px",
          padding: "1rem",
          fontSize: "1.3em",
        }}
        >
       
         {cookies.user ? 
        <>
        <Link to="/appointments" style={{ margin: '10px' }}>Appointments</Link>
        <Link to="/users" style={{ margin: '10px' }}>Users</Link>
        <Link to="/rooms" style={{ margin: '10px' }}>Rooms</Link>
        <Link to="/host" style={{ margin: '10px' }}>Host</Link>
        <button type="submit" onClick={logout}>Logout</button>
        </> :
        <>
        <Link to="/appointments" style={{ margin: '10px' }}>Appointments</Link>
        <Link to="/login" style={{ margin: '10px' }}>Login</Link>
        <Link to="/register" style={{ margin: '10px' }}>Register</Link>
        </>
        }
        
        
      </nav>
      
      <Outlet />
      
    </div>
  );
}

export default App;