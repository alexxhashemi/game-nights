import React from "react";

export default function Show(props) {
  // console.log('appItem props', props);
  // console.log('appItem props key', props.id);
  return (
    <article
      style={{ textAlign: 'center' }}>
      <h1>{props.title}</h1>
      <img style={{ width: '250px', height: '250px' }} alt='' src={props.image} />
      <h4>Category: {props.category}</h4>
      <h4>Game: {props.game}</h4>
      <p>{props.description}</p>
      <button>JOIN</button>
    </article>
  );
}
