import React from "react";
import UserItem from "./UserItem";
import useLocalStorage from "use-local-storage";
import "./Users.css";

export default function Users(props) {
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <div className="users" data-theme={theme}>
      <h1>Users</h1>
      <div className="theme-toggle">
        <h4>☀️ 🌒</h4>
        <i onClick={switchTheme} className="fas fa-toggle-on"></i>
      </div>
    </div>
  );
}
