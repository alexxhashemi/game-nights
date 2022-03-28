import React, {useEffect} from "react";
import { Outlet, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./App.css";

function App(props) {
  const [cookies, setCookies, removeCookie] = useCookies(['user']);
  console.log(cookies);

  const logout = function() {
    removeCookie('user');
    window.location.href = '/';
  }
  console.log(cookies)

  return (
    <div className="App" >
      
      <nav className="navbar"
        style={{
          borderBottom: "solid 5px",
          fontSize: "1.3em",
          fontWeight: "bold",
          justifyContent: "flex-start"
        }}
      >
        <Link to="/"><img id="logo" style={{ justifyContent: "flex-start" }} src="image/gameNightsLogo.png" alt="" /></Link>

        {cookies.user ?
          <>
            <Link to="/meetings" style={{ textDecoration: 'none', margin: '15px' }} >Meetings</Link>
            <Link to="/host" style={{ textDecoration: 'none', margin: '15px' }}>Host</Link>
            <div className="email-logout">
              <h4 style={{color: 'white'}}>{cookies.user}</h4>
              <button className="logout" style={{ margin: '15px 1.2em', fontSize: '20px' }} type="submit" onClick={logout}>Logout</button>
            </div>
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
