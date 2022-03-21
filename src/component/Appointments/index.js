import React, { useState, useEffect } from "react";
import axios from "axios";
import Show from "./Show";
import Form from "./Form";
import './index.css'

export default function Appointments(props) {

  const [appointments, setAppointments] = useState([]);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    Promise.all([
      axios.get('/api/appointments'),
      axios.get('/api/games'),
      axios.get('/api/categories')
    ])
      .then((result) => {
        // console.log('result here', result);
        // all the %%%Data is an array of object
        const appointmentsData = result[0].data.appointments;
        const gamesData = result[1].data.games;
        const categoriesData = result[2].data.categories;
        setAppointments(appointmentsData);
        setGames(gamesData);
        setCategories(categoriesData);
      })
      .catch(err => console.log('Error', err));
  }, []);

  // const appointmentsList = appointments.map((appointment) => {
  const appointmentsList = appointments.filter((appointment) => {
    if (searchTerm === '') {
      return appointment
    } else if (appointment.game.toLowerCase().includes(searchTerm.toLowerCase()) || appointment.category.toLowerCase().includes(searchTerm.toLowerCase())) {
      return appointment
    }
  }).map((appointment) => {
    return (
      <Show
        key={appointment.id}
        host_id={appointment.host_id}
        room_id={appointment.room_id}
        title={appointment.title}
        description={appointment.description}
        image={appointment.image}
        category={appointment.category}
        game={appointment.game}
        time={appointment.time}
      />
    )
  }
  );

  return (
    <main className="appointments">
      <header className="appointments-search-bar">
        <label>Search for</label>
        <input type='text' onChange={event => setSearchTerm(event.target.value)} />
      </header>
      <div className="appointment">
        {appointmentsList}
      </div>
      {/* {<Form games={games} categories={categories} />} */}
    </main>
  );
}
