import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import "./Host.css";

export default function Host() {
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [game, setGame] = useState("");
  const [check, setCheck] = useState("false");

  useEffect(() => {
    document.title = "Host";  
  }, []);


  const submitForum = () => {
    Promise.all([
      axios.post("/api/appointments/new", {
        title: title,
        description: description,
        image: image,
        category: category,
        game: game,
      }),
      axios.post("/api/games/new", {
        image: image,
        game: game,
        category: category,
      }),
    ])
    .then((res) => {
      console.log(res)
      if(title === " ") {
        navigate(`/rooms/${title}%20`);
      }
      navigate(`/rooms/${title}`);
    });
  };

  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const onCheck = (event) => {
    setCheck(!check);
    if (check) {
      return setCategory(event.target.value);
    }
    setCategory("");
  };

  return (
    <form
      action="/new"
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="host-main" data-theme={theme}>
        <div className="host">
          <h1> Host</h1>
          <div className="host-container">
            <div id="host">
              <label>
                <h5>Title</h5>
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <label>
                <h5>Description</h5>
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />

              <label>
                <h5>Image URL</h5>
              </label>
              <input
                name="image"
                type="text"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />

              <label>
                <h5>Game Name</h5>
              </label>
              <input
                name="game"
                type="text"
                onChange={(e) => {
                  setGame(e.target.value);
                }}
              />

              <label>
                <h5>Category</h5>
              </label>
              <div className="category">
                <input
                  type="checkbox"
                  name="Video Game"
                  value="Video Game"
                  onChange={onCheck}
                />{" "}
                Video Game
                <br></br>
                <input
                  type="checkbox"
                  name="Card Game"
                  value="Card Game"
                  onChange={onCheck}
                />{" "}
                Card Game
                <br></br>
                <input
                  type="checkbox"
                  name="Board Game"
                  value="Board Game"
                  onChange={onCheck}
                />{" "}
                Board Game
                <br></br>
                <input
                  type="checkbox"
                  name="Role-playing Game"
                  value="Role-playing Game"
                  onChange={onCheck}
                />{" "}
                Role-playing Game
                <br></br>
              </div>
              <button type="submit" onClick={submitForum}>
                Submit
              </button>
            </div>
          </div>
          <div className="theme-toggle">
          <i onClick={switchTheme} className="fas fa-toggle-on"></i>
            {theme === 'light' && <h5>☀️</h5>}
            {theme === 'dark' && <h5>🌒</h5>}            
          </div>
        </div>
      </div>
    </form>
  );
}
