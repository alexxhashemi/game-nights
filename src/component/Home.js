import React from "react";
import "./Home.css"
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
  return(

<Carousel variant="dark">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://media4.giphy.com/media/3oEjHYlwvUK5p9AIbm/giphy.gif?cid=790b761168c8f7b247714ae9ca33c0ed63ae4e13c854d498&rid=giphy.gif&ct=g"
      alt="First slide"
    />
    <Carousel.Caption>
     <h1>Welcome to Game Nights!</h1>
     <br/>
     <h4>Game Nights allows users to join or create meeting rooms based on the type of game that they're hosting. This allows users to find others to play a game together and maybe make new friends in the process!</h4>
     <br/>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://news.fnal.gov/wp-content/uploads/2020/02/2020-02-11_5e42c8469d971_White_background-scaled.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>(Appointments stuff)</h3>
      <p>(Appointments stuff)</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://64.media.tumblr.com/2531c9ddb7f53e2b2b4aec42ccdc0adb/tumblr_pcow7brvpb1tgl57yo1_1280.gifv"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>(Rooms stuff)</h3>
      <p>(Rooms stuff)</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

  );
}