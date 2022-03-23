import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import AppointmentItem from "./AppointmentItem";

export default function Appointments(props) {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/appointments')
      .then((result) => {
        // console.log('data we got', result.data.appointments);
        setAppointments(result.data.appointments);
        // console.log('appointments array', appointments);
      })
      .catch(e => console.log(e))
  }, []);

  console.log('TESTING', appointments)

  const appointmentsList = appointments.map((appointment) => {
    return (
      <AppointmentItem
        key={appointment.id}
        host_id={appointment.host_id}
        room={appointment.room}
        title={appointment.title}
        description={appointment.description}
        image={appointment.image}
        category={appointment.category}
        // test={appointments}
      />
    )
  }
  );

  return (
    <div>
      {appointmentsList}
    </div>
  );
}