import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotifyWhenInSeason({ sku }) {
  const [registeredEmail, setRegisteredEmail] = useState(null);
  const [email, setEmail] = useState('');

  function onSubmit(event) {
    fetch(`/api/vacations/${sku}/notify-when-in-season`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.status < 200 || res.status > 299) {
        return alert(`This didn't work and you're a failure.`)
      }
      setRegisteredEmail(email);
    });
    event.preventDefault(); // Should prevent html from submitting form traditionally
  }
  if (registeredEmail) {
    return (<i>You will be notified at {registeredEmail} when this vacation is back in season.</i>)
  }
  return (
    <form onSubmit={onSubmit}>
      <i>Notify me when this is in season</i>
      <input
        type='email'
        placeholder='(your email)'
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <button type="submit">THE BUTTON</button>
    </form>
  )

}


function Vacation({ vacation }) {
  return (
    <div key={vacation.sku}>
      <h3>{vacation.name}</h3>
      <p>{vacation.description}</p>
      <p>{vacation.sku} - the SKU</p>
      <span className="price">{vacation.price}</span>
      {!vacation.inSeason &&
        <div>
          <p><i>This vacation is not currently in season.</i></p>
          <NotifyWhenInSeason sku={vacation.sku} />
        </div>
        // Above is an inline condition (if) statement
        // It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false.
        // https://reactjs.org/docs/conditional-rendering.html
      }
    </div>
  )
}

function Vacations() {// prepare state
  const [vacations, setVacations] = useState([]);

  // combine this hook with fetch and "proxy" (the url) to fetch initial data
  // Grabs the vacations to display
  useEffect(() => {
    fetch('/api/vacations').then(res => res.json()).then(setVacations);
  }, []);

  return (
    <div>
      <h2>Vacations</h2>
      <div className="vacations">
        {vacations.map(vacation => (
          <Vacation key="vacation.sku" vacation={vacation} />
        ))}
      </div>
    </div>
  );
}

export default Vacations;