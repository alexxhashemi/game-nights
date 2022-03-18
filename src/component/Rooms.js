import React from "react";
import RoomItem from "components/RoomItem";

export default function Rooms(props) {
  const Rooms = props.Rooms;
  const List = Rooms.map((room) => <RoomItem key={room.id} name={room.name} />);
  return (
    <ul>{List}</ul>
    )
}
