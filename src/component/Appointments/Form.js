import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Form(props) {
  // console.log('Form props.games', props.games);
  // console.log('Form props.categories', props.categories);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [game, setGame] = useState("")

  const submitForum = () => {
    axios.post('/api/appointments/new', {
      title,
      description,
      image,
      category,
      game
    }).then(() =>
      navigate('/')
    )
  }
  return (
    <form onSubmit={event => event.preventDefault()}>
      <div>
        <label>Title</label>
        <input name="title" type="text" onChange={(e) => { setTitle(e.target.value) }} />
      </div>
      <div>
        <label>Description</label>
        <input name="description" type="text" onChange={(e) => { setDescription(e.target.value) }} />
      </div>
      <div>
        <label>Image URL</label>
        <input name="image" type="text" onChange={(e) => { setImage(e.target.value) }} />
      </div>
      <div>
        <label>Category</label>
        <select value='category' onChange={(e) => { setCategory(e.target.value) }}>
          <option value="Video Game">Video Game</option>
          <option value="Card Game">Card Game</option>
        </select>
        {/* <input name="category" type="text" onChange={(e) => { setCategory(e.target.value) }} /> */}
      </div>
      <div>
        <label>Game</label>
        <select value='game' onChange={(e) => { setGame(e.target.value) }}>
          <option value="Lost Ark">Lost Ark</option>
          <option value="Valorant">Valorant</option>
          <option value="Risk of Rain 2">Risk of Rain 2</option>
          <option value="UNO">UNO</option>
          <option value="CATAN">CATAN</option>
        </select>
        {/* <input name="game" type="text" onChange={(e) => { setGame(e.target.value) }} /> */}
      </div>
      <div>
        <button type="submit" onClick={submitForum}>Submit</button>
      </div>
    </form>
  )
}