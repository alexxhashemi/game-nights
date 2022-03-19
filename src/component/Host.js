import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Host() {
  let navigate = useNavigate();

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [game, setGame] = useState("")



  const submitForum = () => { axios.post('/appointments/new', {
    title: title,
    description: description,
    image: image,
    category: category,
    game: game,

    }).then((res) => {
        navigate("/appointments");
    })
  }
  // console.log('HERE')

  return (
    <form action="/new" method="POST" onSubmit={e => { e.preventDefault();}}>
      <label>
        <p>Title</p>
        <input name="title" type="text"  onChange={(e) => {setTitle(e.target.value)}}/>
      </label>
      <label>
        <p>Description</p>
        <input name="description" type="text"  onChange={(e) => {setDescription(e.target.value)}}/>
      </label>
      <label>
        <p>Image URL</p>
        <input name="image" type="text"  onChange={(e) => {setImage(e.target.value)}}/>
      </label>
      <label>
        <p>Category</p>
        <input name="category" type="text"  onChange={(e) => {setCategory(e.target.value)}}/>
      </label>
      <label>
        <p>Game Name</p>
        <input name="game" type="text"  onChange={(e) => {setGame(e.target.value)}}/>
      </label>
      <div>
        <button type="submit" onClick={submitForum}>Submit</button>
      </div>
    </form>
  );
}