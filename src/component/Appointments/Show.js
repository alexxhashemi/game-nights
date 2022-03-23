import React from "react";
import { Card, Button } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


export default function Show(props) {
  // console.log('appItem props', props);
  // console.log('appItem props key', props.id);
  let navigate = useNavigate();
  console.log('asdxzczxcz', props.title)

  return (
    <Card bg='Info' className="mb-5">
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Link to={{
          pathname: `/rooms/${props.game + " " + uuidv4()}`,
          state: {
            title: props.title,
          }
        }}>
          <Button variant="primary" type="submit" >
            JOIN
          </Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">Room ID:{props.room_id}; Category: {props.category}; Game: {props.game}</Card.Footer>
    </Card>
  );
}


