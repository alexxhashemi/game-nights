import React, { useEffect, useState, useRef } from "react";
import { JitsiMeeting } from '@jitsi/react-sdk';
import RoomItem from "./RoomItem";
import './Room.css';
import socketIoClient from 'socket.io-client'
import axios from "axios";

const ENDPOINT = 'localhost:8080'
const connection = socketIoClient(ENDPOINT)

export default function Rooms(props) {
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

    const generateRoomName = () => `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;
    // const generateRoomName = () => Math.random();

    //  console.log('asdasdasd', generateRoomName())

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

    //Was able to get a room made using but it renders all on the same page
    //Need to make it /rooms/:title? Then have it default room to that meeting link
    const roomList = rooms.map((room) => {
        return <div>
            <h1>Rooms Page</h1>
            {/* <video></video> */}

            <h1 style={{
                fontFamily: 'sans-serif',
                textAlign: 'center'
            }}>
                TESTING
            </h1>
            <JitsiMeeting
                // domain = { YOUR_DOMAIN }
                roomName={room.title}
                spinner={renderSpinner}
                configOverwrite={{
                    requireDisplayName: false,
                    prejoinPageEnabled: false
                }}
                onApiReady={externalApi => handleApiReady(externalApi)}
                onReadyToClose={handleReadyToClose}
                getIFrameRef={handleJitsiIFrameRef1} />

        </div>
    })

    // console.log('TESTING', generateRoomName())
    // console.log('TESTING2', roomList)


    return (
        <div>
            {/* {roomList} */}
            {/* <h1>Rooms Page</h1>
    {/* <video></video> */}

            <h1 style={{
                fontFamily: 'sans-serif',
                textAlign: 'center'
            }}>
                TESTING
            </h1>
            <JitsiMeeting
                // domain = { YOUR_DOMAIN }
                roomName={generateRoomName}
                spinner={renderSpinner}
                configOverwrite={{
                    requireDisplayName: false,
                    prejoinPageEnabled: false
                }}
                onApiReady={externalApi => handleApiReady(externalApi)}
                onReadyToClose={handleReadyToClose}
                getIFrameRef={handleJitsiIFrameRef1} />

        </div>
    )
};