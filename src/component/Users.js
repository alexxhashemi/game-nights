import React from "react";
import UserItem from "./UserItem";

export default function Users(props) {

  return (
    <h1>Users</h1>
  )

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
