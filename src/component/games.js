import React from "react";
import GameItem from "./GameItem";

export default function Games(props) {

  return (
    <h1>Games Page</h1>
  )
  // the rest of code should work after we got the props from app.js
  // const Games = props.games;
  // const List = Games.map((game) => (
  //   <GameItem
  //     key={game.id}
  //     user_id={game.user_id}
  //     title={game.title}
  //     description={game.description}
  //     image={game.image}
  //     category={game.category}
  //     time={game.time}
  //   />
  // ));
  // return (
  //   <ul>{List}</ul>
  // )
}
