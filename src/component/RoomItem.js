import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import socketIoClient, { io } from 'socket.io-client'

// const ENDPOINT = 'http://localhost:8080'
// const connection = socketIoClient(ENDPOINT)
export default function RoomItem(props) {
  const [room, setRoom] = useState({});
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);
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
    // console.log(room);

  }, [])



  const chat = () => {

  }
  return (
    <div>
      <h1>Room</h1>
      <h1>{room.title}</h1>
      <h1>{room.description}</h1>
      <h1>{room.game}</h1>
      <form>
        <input name='chat' type='text' />
        <button>Chat</button>
      </form>
    </div>
  );
}

// useEffect(() => {
  //   const socket = io('/');
  //   socket.on('connect', () => {
  //     console.log('connect to the server');
  //     socket.emit('greeting', 'hello');
  //   })
  //   console.log('test');

  //   socket.on('INITIAL', (data) => {
  //     console.log('initial Data', data);

  //   })
  //   socket.on("NEW_USER", data => {
  //     // setUsers(prev => [...prev, data.name]);
  //     console.log('new-user data here', data);
  //   })
  // }, [])