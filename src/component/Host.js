import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import useLocalStorage from "use-local-storage";
import "./Host.css";

export default function Host() {
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [game, setGame] = useState("");
  const [check, setCheck] = useState('false');


  const submitForum = () => {
    Promise.all([
      axios
        .post("/api/appointments/new", {
          title: title,
          description: description,
          image: image,
          category: category,
          game: game,
        }),
      axios.post("/api/games/new", {
        image: image,
        game: game,
        category: category
      })
    ])

      .then((res) => {
        navigate("/rooms");
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
    setCategory('');
  }

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
              <label>Title</label>
              <input
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <label>Description</label>
              <input
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />

              <label>Image URL</label>
              <input
                name="image"
                type="text"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />

              <label>Game Name</label>
              <input
                name="game"
                type="text"
                onChange={(e) => {
                  setGame(e.target.value);
                }}
              />

              <label>Category</label>
              <div>
                <input type='checkbox' name='Video Game' value='Video Game' onChange={onCheck} /> Video Game
                <br></br>
                <input type='checkbox' name='Card Game' value='Card Game' onChange={onCheck} /> Card Game
                <br></br>

                <input type='checkbox' name='Board Game' value='Board Game' onChange={onCheck} /> Board Game
                <br></br>

              </div>
              <button type="submit" onClick={submitForum}>
                Submit
              </button>
            </div>
          </div>
          <div className="theme-toggle">
            <h4>☀️ 🌒</h4>
            <i onClick={switchTheme} className="fas fa-toggle-on"></i>
          </div>
        </div>
      </div>
    </form>
  );
}

/*
<label>
        <p>Title</p>
        <input
          name="title"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </label>
      <label>
        <p>Description</p>
        <input
          name="description"
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </label>
      <label>
        <p>Image URL</p>
        <input
          name="image"
          type="text"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
      </label>
      <label>
        <p>Category</p>
        <select
          value="category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="Video Game">Video Game</option>
          <option value="Card Game">Card Game</option>
        </select>
        {/* <input name="category" type="text" onChange={(e) => { setCategory(e.target.value) }} /> */

/*
        </label>
        <label>
          <p>Game Name</p>
          <select
            value="game"
            onChange={(e) => {
              setGame(e.target.value);
            }}
          >
            <option value="Lost Ark">Lost Ark</option>
            <option value="Valorant">Valorant</option>
            <option value="Risk of Rain 2">Risk of Rain 2</option>
            <option value="UNO">UNO</option>
            <option value="CATAN">CATAN</option>
          </select>
          {/* <input name="game" type="text" onChange={(e) => { setGame(e.target.value) }} /> */

/*
        </label>
        <div>
          <Button type="submit" variant="danger" onClick={submitForum}>
            Submit
          </Button>
        </div>

*/
