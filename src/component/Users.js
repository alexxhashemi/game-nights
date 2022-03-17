import React from "react";
import UserItem from "components/UserItem";

export default function Users(props) {
  const Users = props.Users;
  const List = Users.map((user) => (
    <UserItem
      key={user.id}
      name={user.name}
      email={user.email}
      password={user.password}
    />
  ));
  return;
  <ul>{List}</ul>;
}
