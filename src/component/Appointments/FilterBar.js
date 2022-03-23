import React, { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import "./FilterBar.css";

export default function FilterBar(props) {
  const [check, setCheck] = useState("false");
  const games = props.games;
  const categories = props.categories;
  // console.log('filter games', games);

  const onCheck = (event) => {
    setCheck(!check);
    if (check) {
      return props.setSearchTerm(event.target.value);
    }
    props.setSearchTerm("");
  };

  const gamesList = games.map((game) => {
    return (
      <div key={game.id}>
        <input
          type="checkbox"
          name={game.name}
          value={game.name}
          onChange={onCheck}
        />{" "}
        {game.name}
      </div>
    );
  });

  const categoriesList = categories.map((category) => {
    return (
      <div key={category.id}>
        <input
          type="checkbox"
          name={category.name}
          value={category.name}
          onChange={onCheck}
        />{" "}
        {category.name}
      </div>
    );
  });

  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <>
      <div className="main" data-theme={theme}>
        <div className="host">
          <h1> Appointments</h1>
          <div className="filter-container">
            <div id="login">
              <h4>Search for</h4>
              <input
                type="text"
                onChange={(event) => props.setSearchTerm(event.target.value)}
              />

              <h4>Filter by Game</h4>
              <div className="Games">{gamesList}</div>
              <br></br>
              <h4>Filter by Category</h4>
              <div className="Categories">{categoriesList}</div>
            </div>
          </div>
          <div className="theme-toggle">
            <h4>☀️ 🌒</h4>
            <i onClick={switchTheme} className="fas fa-toggle-on"></i>
          </div>
        </div>
      </div>

      {/* <header className="appointments-search-bar">
        <h3>Search for</h3>
        <input type='text' onChange={event => props.setSearchTerm(event.target.value)} />
      </header>
      <h3>Filter by Game</h3>
      <div className='Games'>
        {gamesList}
      </div> */}
      {/* <h3>Filter by Category</h3>
      <div className='Categories'>
        {categoriesList}
      </div> */}
    </>
  );
}
