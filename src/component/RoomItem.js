import React, { useEffect, useState, useRef } from "react";
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './RoomItem.css'

export default function RoomItem(props) {
  useEffect(() => {
    document.title = "Meetings";  
  }, []);

  let navigate = useNavigate();

  //Jitsi API
  const apiRef = useRef();
  const [logItems, updateLog] = useState([]);
  const [knockingParticipants, updateKnockingParticipants] = useState([]);

  const printEventOutput = payload => {
    updateLog(items => [...items, JSON.stringify(payload)]);
  };

  const handleAudioStatusChange = (payload, feature) => {
    if (payload.muted) {
      updateLog(items => [...items, `${feature} off`])
    } else {
      updateLog(items => [...items, `${feature} on`])
    }
  };

  const handleChatUpdates = payload => {
    if (payload.isOpen || !payload.unreadCount) {
      return;
    }
    apiRef.current.executeCommand('toggleChat');
    updateLog(items => [...items, `you have ${payload.unreadCount} unread messages`])
  };

  const handleKnockingParticipant = payload => {
    updateLog(items => [...items, JSON.stringify(payload)]);
    updateKnockingParticipants(participants => [...participants, payload?.participant])
  };

  const handleJitsiIFrameRef1 = iframeRef => {
    iframeRef.style.background = '#3d3d3d';
    iframeRef.style.height = '700px';
  };

  const handleApiReady = apiObj => {
    apiRef.current = apiObj;
    apiRef.current.on('knockingParticipant', handleKnockingParticipant);
    apiRef.current.addEventListeners({
      // Listening to events from the external API
      audioMuteStatusChanged: payload => handleAudioStatusChange(payload, 'audio'),
      videoMuteStatusChanged: payload => handleAudioStatusChange(payload, 'video'),
      raiseHandUpdated: printEventOutput,
      tileViewChanged: printEventOutput,
      chatUpdated: handleChatUpdates,
      knockingParticipant: handleKnockingParticipant
    });
  };

  const handleReadyToClose = () => {
    alert('Ready to close...');
  };

  const renderSpinner = () => (
    <div style={{
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      Loading..
    </div>
  );

  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState([])

  useEffect(() => {
    axios.get('/api/appointments')
      .then((result) => {
        setRooms(result.data.appointments)
      })
      .catch(error => error)
  }, []);

  useEffect(() => {
    axios.get('/api/users')
      .then((result) => {
        setUser(result.data.users)
      })
      .catch(error => error)
  }, []);


  const [room, setRoom] = useState({});
  const { id } = useParams();

  for(let meep of user) {
    for(let beep of rooms) {
      if(meep.id === beep.host_id) {
        // console.log(beep.title)
      }
    }
  }

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
  }, [])

  const room_id = id

  const removePost = () => {
    axios
      .post("/api/appointments/delete", {
        room_id: room_id,
      })
      .then((res) => {
        navigate("/meetings");
      });
  };

  return (
    <div className="main-room">
      <h1 className="title">{id}</h1>
      <br></br>
      <JitsiMeeting
        roomName={id}
        spinner={renderSpinner}
        configOverwrite={{
          requireDisplayName: false,
          prejoinPageEnabled: false
        }}
        onApiReady={externalApi => handleApiReady(externalApi)}
        onReadyToClose={handleReadyToClose}
        getIFrameRef={handleJitsiIFrameRef1} />

        <button className="end-call" onClick={() => { if (window.confirm(`Are you sure you want to delete ${id} meeting?`)) removePost()} }>End Call</button>
    </div>
  );
}