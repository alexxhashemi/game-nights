import React, { useState } from "react";
import useLocalStorage from "use-local-storage";
import "./FilterBar.css";

export default function FilterBar(props) {
  const [check, setCheck] = useState(false);
  const games = props.games;
  const categories = props.categories;

  const onCheck = (event) => {
    if (!check) {
      props.setSearchTerm(event.target.value);
    } else {
      props.setSearchTerm('');
    }
    setCheck(!check);
  }

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
      <div className="filter-main" data-theme="dark">
        <div className="filter">
          <h2> Appointments</h2>
          <div className="filter-container">
            <div id="login">
              <h4>Search for</h4>
              <input
                type="text"
                onChange={(event) => props.setSearchTerm(event.target.value)}
              />
              <br></br>
              <h4>Filter by Game</h4>
              <div className="Games">{gamesList}</div>
              <br></br>
              <br></br>
              <h4>Filter by Category</h4>
              
              <div className="Categories">{categoriesList}</div>
            </div>
          </div>
          {/* <div className="theme-toggle">
            <h4>☀️ 🌒</h4>
            <i onClick={switchTheme} className="fas fa-toggle-on"></i>
          </div> */}
        </div>
      </div>
    </>
  );
}
