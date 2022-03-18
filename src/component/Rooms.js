import React from "react";
import RoomItem from "./RoomItem";
import socketIoClient from 'socket.io-client'
const ENDPOINT = 'http://localhost/3000'
const connection = socketIoClient(ENDPOINT)

export default function Rooms(props) {
  return (
    <h1>Rooms Page</h1>
  )
  // the rest of code should work after we got the props from app.js 
  // const Rooms = props.Rooms;
  // const List = Rooms.map((room) => <RoomItem key={room.id} name={room.name} />);
  // return (
  //   <ul>{List}</ul>
  // )
}
