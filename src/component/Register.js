import axios from "axios";
import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Register() {
  //Need inoder to redirect
  let navigate = useNavigate();

  //States for database
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [cookies, setCookie] = useCookies(['user']);


  const submitRegister = () => { axios.post('/api/users/register', {
    username: username,
    email: email,
    password: password,

  }).then((res) => {
    // console.log(res)

    setCookie('user', 'cookiesvalue');

    //redirects to homepage
    navigate("/");
  })
}

  return (
    <form action="/register" method="POST" onSubmit={e => { e.preventDefault(); }}>
    <label>
        <p>Username</p>
        <input name="name" type="text" onChange={(e) => {setUsername(e.target.value)}}/>
      </label>
      <label>
        <p>Email</p>
        <input name="email" type="email" onChange={(e) => {setEmail(e.target.value)}}/>
      </label>
      <label>
        <p>Password</p>
        <input name="password" type="password" onChange={(e) => {setPassword(e.target.value)}}/>
      </label>
      <div>
        <button onClick={submitRegister} type="submit">Register</button>
      </div>
    </form>
  );
}
