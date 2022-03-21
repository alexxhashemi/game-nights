import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Users from './component/Users';
import Appointments from './component/Appointments';
import { Outlet, Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function App() {
  const history = useHistory();
  
  const logout = function() {
    localStorage.clear();
    history.push('/');
  }

  const [cookies] = useCookies(['user']);
  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
        >
         { cookies.user ? 
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