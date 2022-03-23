import React, { useEffect, useState, useRef } from "react";
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RoomItem(props) {
  let navigate = useNavigate();

  //Jitsi API
  const apiRef = useRef();
  const [logItems, updateLog] = useState([]);
  const [showNew, toggleShowNew] = useState(false);
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

  const resolveKnockingParticipants = condition => {
    knockingParticipants.forEach(participant => {
      apiRef.current.executeCommand('answerKnockingParticipant', participant?.id, condition(participant));
      updateKnockingParticipants(participants => participants.filter(item => item.id === participant.id));
    });
  };

  const handleJitsiIFrameRef1 = iframeRef => {
    iframeRef.style.border = '10px solid #3d3d3d';
    iframeRef.style.background = '#3d3d3d';
    iframeRef.style.height = '400px';
  };

  const handleJitsiIFrameRef2 = iframeRef => {
    iframeRef.style.marginTop = '10px';
    iframeRef.style.border = '10px dashed #df486f';
    iframeRef.style.padding = '5px';
    iframeRef.style.height = '400px';
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

  useEffect(() => {
    axios.get('/api/appointments')
      .then((result) => {
        setRooms(result.data.appointments)
        // console.log('appointments array', appointments);
      })
      .catch(error => error)
  }, []);


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




  // console.log('TESTING', id.split(" "))

  let roomTitle = id.split(" ")

  const [appointments, setAppointments] = useState([]);


  console.log('asdasdasdasd', roomTitle.pop())
  const find = roomTitle.pop()

  //   console.log('TESTINGNEW', roo)



  const [room_id, setRoom_id] = useState("");


  const removePost = () => {
    axios
      .post("/api/appointments/delete", {
        room_id: room_id,

      })
      .then((res) => {
        // setRoom_id(roomTitle.pop())
        navigate("/appointments");
      });
  };

  //   setRoom_id(find)



  //    let g = room_id.map(y => {console.log('WORK', y)})
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', find)
  return (
    <div>
      <h1>{roomTitle[0]}</h1>
      <JitsiMeeting
        // domain = { YOUR_DOMAIN }
        roomName={id}
        spinner={renderSpinner}
        configOverwrite={{
          requireDisplayName: false,
          prejoinPageEnabled: false
        }}
        onApiReady={externalApi => handleApiReady(externalApi)}
        onReadyToClose={handleReadyToClose}
        getIFrameRef={handleJitsiIFrameRef1} />
      <div >
        <form action="/appointments/delete" method="post" onSubmit={(e) => {
          e.preventDefault();
        }}>
          <input
            onChange={(e) => {
              setRoom_id(e.target.value);
            }}
          />
          <button onClick={removePost} type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

