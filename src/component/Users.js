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
        <h5>Theme Mode</h5>
        <i onClick={switchTheme} className="fas fa-toggle-on"></i>
      </div>
    </div>
  );

  //the rest of code should work after we got the props from app.js
  // const Users = props.Users;
  // const List = Users.map((user) => (
  //   <UserItem
  //     key={user.id}
  //     username={user.username}
  //     email={user.email}
  //     password={user.password}
  //   />
  // ));
  // return (
  //   <ul>{List}</ul>
  // )
}
