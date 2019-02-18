import React from 'react';
import './ReservationForm.scss';

const ReservationForm = (props) => {
    const { reservationDay,reservationTime, onFormSubmit, onInputChange } = props;
    return (
      <form onSubmit={onFormSubmit}>
        <h3>Jūsų pasirinktas laikas yra:</h3>
        <p>{reservationDay} {reservationTime}</p>
        <label htmlFor="user">Jūsų Vardas Pavardė</label>
        <input type="text" name="user" onChange={onInputChange}/>
        <label htmlFor="phone">Jūsų telefonas</label>
        <input type="text" name="phone" onChange={onInputChange}/>
        <input type="submit" value="Rezervuotis"/>
      </form>
    );
}

export default ReservationForm;