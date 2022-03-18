import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import GameItem from "./GameItem";

export default function Games(props) {

  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('/games')
      .then((result) => {
        // console.log('data we got', result.data.games);
        setGames(result.data.games);
        // console.log('games array', games);
      })
      .catch(e => console.log(e))
  }, []);

  const gamesList = games.map((game) => {
    return (

      <GameItem
        key={game.id}
        user_id={game.host_id}
        room_id={game.room_id}
        title={game.title}
        description={game.description}
        image={game.image}
        category={game.category}
        time={game.time}
      />
    )
  }
  );

  return (
    <div>
      {gamesList}
    </div>
  );
}
