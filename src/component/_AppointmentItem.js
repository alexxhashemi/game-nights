import React from "react";
import { useNavigate } from "react-router-dom";


export default function AppointmentItem(props) {
  let navigate = useNavigate();

  // console.log('appItem props', props);
  // console.log('appItem props key', props.id);

  const test = () => {
    // console.log('HELLO')
    navigate("/");

  }
  return (
    <article
      style={{ textAlign: 'center' }}>
      <h1>{props.title}</h1>
      <img style={{ width: '250px', height: '250px' }} src={props.image} />
      <h4>Category: {props.category}</h4>
      <p>{props.description}</p>
      <button type="submit" onClick={test}>JOIN</button>
    </article>
  );
}
