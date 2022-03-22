import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';


export default function Login() {
   //Need inoder to redirect
  let navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [cookies, setCookie] = useCookies(['user']);
 

  const submitLogin = () => { axios.post('/api/users/login', {
      email: email,
      password: password,

    }).then((res) => {
        
        setCookie('user', 'cookiesvalue');
        
        navigate("/appointments");
    })
  }

  return (
    <form action="/login" method="POST" onSubmit={e => { e.preventDefault();}}>
      <label>
        <p>Email</p>
        <input name="email" type="text"  onChange={(e) => {setEmail(e.target.value)}}/>
      </label>
      <label>
        <p>Password</p>
        <input name="password" type="password"  onChange={(e) => {setPassword(e.target.value)}}/>
      </label>
      <div>
        <button variant="dark" type="submit" onClick={submitLogin}>Submit</button>
      </div>
    </form>
  );
}