import React, { useEffect, useState, useRef } from "react";
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useParams } from "react-router-dom";
import axios from "axios";
import socketIoClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:8080'
const connection = socketIoClient(ENDPOINT)


export default function RoomItem(props) {
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

  // console.log('asdasdasdasd', rooms)
  // console.log('TESTING', id.split(" "))

  let roomTitle= id.split(" ")

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

    </div>
  );
}
