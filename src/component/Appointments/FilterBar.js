import React, { useState, useEffect } from 'react';

export default function FilterBar(props) {
  const [check, setCheck] = useState('false');
  const games = props.games;
  const categories = props.categories;
  // console.log('filter games', games);

  const onCheck = (event) => {
    setCheck(!check);
    if (check) {
      return props.setSearchTerm(event.target.value);
    }
    props.setSearchTerm('');
  }

  const gamesList = games.map((game) => {
    return (
      <div key={game.id}>
        <input type='checkbox' name={game.name} value={game.name} onChange={onCheck} /> {game.name}
      </div>
    )
  })

  const categoriesList = categories.map((category) => {
    return (
      <div key={category.id}>
        <input type='checkbox' name={category.name} value={category.name} onChange={onCheck} /> {category.name}
      </div>
    )
  })

  return (
    <>
      <header className="appointments-search-bar">
        <h3>Search for</h3>
        <input type='text' onChange={event => props.setSearchTerm(event.target.value)} />
      </header>
      <h3>Filter by Game</h3>
      <div className='Games'>
        {gamesList}
      </div>
      <h3>Filter by Category</h3>
      <div className='Categories'>
        {categoriesList}
      </div>
    </>
  )
}