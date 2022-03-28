import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useLocalStorage from "use-local-storage";
import "./Login.css";

export default function Register() {
  useEffect(() => {
    document.title = "Register";  
  }, []);

  //Need inoder to redirect
  let navigate = useNavigate();

  //States for database
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cookies, setCookie] = useCookies(["user"]);

  const submitRegister = () => {
    axios
      .post("/api/users/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        setCookie("user", "cookiesvalue");
        navigate("/");
      });
  };

  const [theme, setTheme] = useLocalStorage("theme" ? "light" : "dark");
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <form
      action="/register"
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="login-main" data-theme={theme}>
        <div className="login">
          <h1> Register</h1>
          <div className="container">
            <div id="login">
              <label><h6>Username</h6></label>
              <input
                type="text"
                placeholder="Enter your username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label><h6>E-mail</h6></label>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label><h6>Password</h6></label>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="remember">
                <input type="checkbox" checked="checked" />
                <p>Agree with terms and conditions</p>
              </div>
              <button onClick={submitRegister} type="submit">
                Register
              </button>
            </div>
            <div className="bottom"></div>
          </div>
          <div className="theme-toggle">
          <i onClick={switchTheme} className="fas fa-toggle-on"></i>
            {theme === 'light' && <h5>☀️</h5>}
            {theme === 'dark' && <h5>🌒</h5>}      
          </div>
        </div>
      </div>
    </form>
  );
}
