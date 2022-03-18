import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, Link } from 'react-router-dom';

function App() {
  const [state, setState] = useState({
    users: [],
    games: {},
  });

  useEffect(() => {
    axios.get('/api/users').then(response => {
      Promise.all([
        axios.get('/api/users'),
        axios.get('/api/games'),
      ]).then((all) => {
        // console.log('find', all[1].data)
        setState(prev => ({ ...prev, users: all[0].data, games: all[1].data }));
      });
    });
  }, []);

  //GAME POST DATA
  let gameObj = {}
  let postVal = Object.values(state.games)
  // console.log('asdas', v)
  for (let val of postVal) {
    // console.log('asdasd', d)
    let parsedVal = val.map(p => p)
    gameObj = parsedVal
  }


  let renderPosts = Object.values(gameObj).map(c => {
    return <article key={c.id} style={{ textAlign: 'center' }}>
      <h1>{c.title}</h1>
      {/* <h3>{c.username}</h3> */}
      <img style={{ width: '500px', height: '400px' }} src={c.image} />
      <h4>Category: {c.category}</h4>
      <p>{c.description}</p>
      <button>JOIN</button>
    </article>
  })

  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/users" style={{ margin: '10px' }}>Users</Link>
        <Link to="/games" style={{ margin: '10px' }}>Games</Link>
        <Link to="/login" style={{ margin: '10px' }}>Login</Link>
        <Link to="/register" style={{ margin: '10px' }}>Register</Link>
        <Link to="/rooms" style={{ margin: '10px' }}>Rooms</Link>
      </nav>
      {/* {renderPosts} */}
      <Outlet />
    </div>
  );
}

export default App;