import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import socketIoClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:8080'
const connection = socketIoClient(ENDPOINT)

export default function RoomItem(props) {
  const [room, setRoom] = useState({});
  const { id } = useParams();
  // console.log('RoomItem Props', id)

  const getRoomData = async () => {
    try {
      const appointments = await axios.get('/api/appointments');
      const rooms = appointments.data.appointments;
      const room = rooms.find((appointment) => {
        if (appointment.room_id == id) {
          return appointment
        }
      });
      setRoom(room);
    } catch (error) {
      console.log('Error', error);
    }
  }

  useEffect(() => {
    getRoomData();
    console.log(room);
  }, [])

  return (
    <div>
      <h1>Room</h1>
      <h1>{room.title}</h1>
      <h1>{room.description}</h1>
      <h1>{room.game}</h1>
    </div>
  );
}
