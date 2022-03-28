import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import useLocalStorage from "use-local-storage";
import "./Login.css";

export default function Login() {
  useEffect(() => {
    document.title = "Login";  
  }, []);

  //Need inoder to redirect
  let navigate = useNavigate();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cookies, setCookie] = useCookies(["user"]);

  const submitLogin = () => {
    axios
      .post("/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setCookie("user", email);
        navigate("/meetings");
      });
  };

  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  console.log(cookies)

  return (
    <form
      action="/login"
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="login-main" data-theme={theme}>
        <div className="login">
          <h1> Login</h1>
          <div className="container">
            <div id="login">
              <label>
                <h6>E-mail</h6>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label>
                <h6>Password</h6>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="remember">
                <input type="checkbox" checked="checked" />
                <p>Remember Me</p>
              </div>
              <button type="submit" onClick={submitLogin}>
                Log In
              </button>
            </div>
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
