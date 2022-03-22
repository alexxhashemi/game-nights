import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Users from './component/Users';
import Appointments from './component/Appointments';
import Login from './component/Login';
import Register from './component/Register';
import Rooms from './component/Rooms';
import Host from './component/Host';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <CookiesProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='users' element={<Users />} />
            <Route path='appointments' element={<Appointments />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='rooms' element={<Rooms />} />
            <Route path='host' element={<Host />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </CookiesProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();