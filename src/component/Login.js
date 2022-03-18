import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
   //Need inoder to redirect
  let navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitLogin = () => { axios.post('/users/login', {
      email: email,
      password: password,

    }).then((res) => {
        // console.log('data', res)
        //redirects to homepage
        navigate("/");
    })
  }

  return (
    <form action="/login" method="POST" onSubmit={e => { e.preventDefault();}}>
      <label>
        <p>email</p>
        <input name="email" type="text"  onChange={(e) => {setEmail(e.target.value)}}/>
      </label>
      <label>
        <p>Password</p>
        <input name="password" type="password"  onChange={(e) => {setPassword(e.target.value)}}/>
      </label>
      <div>
        <button type="submit" onClick={submitLogin}>Submit</button>
      </div>
    </form>
  );
}