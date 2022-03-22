import React from "react";
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


export default function Show(props) {
  // console.log('appItem props', props);
  // console.log('appItem props key', props.id);
  let navigate = useNavigate();

  const test = () => {
    // console.log('HELLO')
    navigate(`/rooms`);

  }
  return (
    <Card bg='Info' className="mb-5">
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Button variant="danger" type="submit" onClick={test}>Join</Button>
      </Card.Body>
      <Card.Footer className="text-muted">Room ID:{props.room_id}; Category: {props.category}; Game: {props.game}</Card.Footer>
    </Card>
  );
}

// export default function Show(props) {
//   // console.log('appItem props', props);
//   // console.log('appItem props key', props.id);
//   return (
//     <article
//       style={{ textAlign: 'center' }}>
//       <h1>{props.title}</h1>
//       <img style={{ width: '250px', height: '250px' }} alt='' src={props.image} />
//       <h4>Category: {props.category}</h4>
//       <h4>Game: {props.game}</h4>
//       <p>{props.description}</p>
//       <button>JOIN</button>
//     </article>
//   );
// }

