import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Meetings from './component/Meetings';
import Login from './component/Login';
import Register from './component/Register';
import Host from './component/Host';
import RoomItem from './component/RoomItem';
import Home from './component/Home';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <CookiesProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
           <Route path='/' element={<Home />} />
            <Route path='meetings' element={<Meetings />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='host' element={<Host />} />
            <Route path='rooms/:id' element={<RoomItem />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </CookiesProvider>,
  document.getElementById('root')
);

reportWebVitals();