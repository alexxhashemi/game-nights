import './App.css';
import React from "react";
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

  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    console.log("test")
  };


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
            <Link to="/appointments" style={{ textDecoration: 'none', margin: '15px' }} >Appointments</Link>
            <Link to="/users" style={{ textDecoration: 'none', margin: '15px' }}>Users</Link>
            {/* <Link to="/rooms" style={{ textDecoration: 'none', margin: '15px 25px'}}>Rooms</Link> */}
            <Link to="/host" style={{ textDecoration: 'none', margin: '15px' }}>Host</Link>
            <button className="logout" style={{ textDecoration: 'none', margin: '15px 2em' }} type="submit" onClick={logout}>Logout</button>
          </> :
          <>
            <Link to="/login" style={{ textDecoration: 'none', margin: '15px' }}>Login</Link>
            <Link to="/register" style={{ textDecoration: 'none', margin: '15px' }}>Register</Link>
          </>
        }


      </nav>

      <Outlet />

    </div>
  );
}

export default App;
