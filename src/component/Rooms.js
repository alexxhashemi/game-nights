import React, { useEffect, useState } from "react";
import RoomItem from "./RoomItem";
import './Room.css';
import socketIoClient from 'socket.io-client'
const ENDPOINT = 'localhost:8080'
const connection = socketIoClient(ENDPOINT)

export default function Rooms() {

//MND
  const constraints = { audio: true, video: { width: 400, height: 300 } };
  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(mediaStream) {
    const video = document.querySelector('video');
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
      video.play();
    };
  })
  .catch(function(err) { console.log(err.name + ": " + err.message); }); 

return (
  <div>
    <h1>Rooms Page</h1>
    <video></video>
  </div>
)
// the rest of code should work after we got the props from app.js 
// const Rooms = props.Rooms;
// const List = Rooms.map((room) => <RoomItem key={room.id} name={room.name} />);
// return (
//   <ul>{List}</ul>
// )
};