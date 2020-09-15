import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Vacations() {
  // prepare state
  const [vacations, setVacations] = useState([]);

//combine this hook with fetch and "proxy" to fetch initial data
useEffect(() => {
  fetch('/api/vacations')
  .then(res => res.json())
  .then(setVacations);
},[]);

  return (
    <div>
      <h2>Vacations</h2>
      <div className="vacations">
        {vacations.map(vacation => (
          <div key={vacation.sku}>
            <h3>{vacation.name}</h3>
            <p>{vacation.description}</p>
            <span className="price">{vacation.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vacations;