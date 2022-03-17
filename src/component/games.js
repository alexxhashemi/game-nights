import React from "react";
import GameItem from "components/GameItem";

export default function Games(props) {
  const Games = props.games;
  const List = Games.map((game) => (
    <GameItem
      key={game.id}
      user_id={game.user_id}
      title={game.title}
      description={game.description}
      image={game.image}
      category={game.category}
      time={game.time}
    />
  ));
  return;
  <ul>{List}</ul>;
}
