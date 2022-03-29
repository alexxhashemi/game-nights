import React, { useEffect } from "react";
import "./Home.css"
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    useEffect(() => {
      document.title = "Game Nights";
    }, []);

  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media4.giphy.com/media/3oEjHYlwvUK5p9AIbm/giphy.gif?cid=790b761168c8f7b247714ae9ca33c0ed63ae4e13c854d498&rid=giphy.gif&ct=g"
          alt="First slide"
        />
        <Carousel.Caption>
          <h1>Welcome to Game Nights! Where every night is a game night</h1>
          <br />
          <h4>Game Nights allows users to join or create meeting rooms based on the type of game that they're hosting. This allows users to find others to play a game together and maybe make new friends in the process!</h4>
          <br />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://github.com/AliHashemi86/game-nights/blob/master/docs/Meetings.gif?raw=true"
          alt="Meetings slide"
        />

        <Carousel.Caption style={{ color: 'white' }}>
          <h2>Users can view a list of game rooms </h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://github.com/AliHashemi86/game-nights/blob/master/docs/FinalRooms.gif?raw=true"
          alt="Rooms slide"
        />

        <Carousel.Caption style={{ color: 'white' }}>
          <h2>Users are able to join a game room and can be on video or chat with others within a room</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  );
}