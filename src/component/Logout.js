import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';

export const Logout = (props) => {

  const [logout, setLogout] = useState(false)

  const logOut = () => {
    localStorage.removeItem("user")
    setLogout(true)

  };

  if (logout) {
    return <Redirect to="/" push={true} />
  }

  return <button onClick={logout}>LogOut</button>;
};