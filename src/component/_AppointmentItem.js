import React from "react";

export default function AppointmentItem(props) {
  // console.log('appItem props', props);
  // console.log('appItem props key', props.id);
  return (
    <article
      style={{ textAlign: 'center' }}>
      <h1>{props.title}</h1>
      <img style={{ width: '250px', height: '250px' }} src={props.image} />
      <h4>Category: {props.category}</h4>
      <p>{props.description}</p>
      <button>JOIN</button>
    </article>
  );
}
