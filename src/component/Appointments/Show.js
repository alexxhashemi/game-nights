import React from "react";
import { Card, Button } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import './index.css'

export default function Show(props) {
  // console.log('appItem props', props);
  // console.log('appItem props key', props.id);
  let navigate = useNavigate();
  // console.log('asda', props)
  return (
  
    <Card bg='Info' className="appointment-container">
      <Card.Img className="card-image" variant='top' src={props.image} />
      <Card.Body className="card-body">
        <Card.Title>{props.title}</Card.Title>
        <Card.Text className='text'>
          {props.description}
        </Card.Text>
        <Link to={{
          pathname: `/rooms/${props.title}`,
          state: {
            title: props.title,
          }
        }}>
          <button class="btn btn-danger" type="submit" >
            Join
          </button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">Room ID:{props.room}; Category: {props.category}; Game: {props.game}</Card.Footer>
    </Card>
  );
}


