import React, {Component} from 'react';
import Calendar from 'react-calendar';
import ReservationForm from '../ReservationForm/ReservationForm';
import './Reservation.scss';
import clientTimes from '../../times';
import * as clientStorage from '../../clientStorage';
import uuid from 'uuid/v4';



class Reservation extends Component {
  state = {
    date: new Date(),
    selectedTime: 'times',
    user: '',
    phone: '',
    selectedDay: '',
    clients: '',
    todayClients: '',
    reservationTimes: [],
    todayReservationTimes: []
  }

  componentDidMount() {
    const selectedDay = this.state.date.toLocaleString('lt-LT', { year: 'numeric', month: 'numeric', day: 'numeric' });
    const clients = clientStorage.getClients();
    const newClients = clients && clients.filter(client => {
      if(client.selectedDay === selectedDay) {
        return client.selectedTime;
      }
    });
    console.log(newClients);
    const newReservationTimes = clientTimes && clientTimes.filter(time => {
      let newClientsJSON = JSON.stringify(newClients)
      return !newClientsJSON.includes(time.start);
    });
    // console.log(newReservationTimes)
    this.setState({
      todayClients: newClients,
      selectedDay,
      todayReservationTimes: newReservationTimes
    })
  }

  onChange = date => {
    const selectedDay = date.toLocaleString('lt-LT', { year: 'numeric', month: 'numeric', day: 'numeric' });
    const clients = clientStorage.getClients();
    const newClients = clients && clients.filter(client => {
      if (client.selectedDay === selectedDay) {
        return client;
      }
    });
    const newReservationTimes = clientTimes && clientTimes.filter(time => {
      let newClientsJSON = JSON.stringify(newClients);
      return !newClientsJSON.includes(time.start);
    });
    this.setState({
      date,
      todayReservationTimes: newReservationTimes,
      todayClients: newClients,
      selectedDay
    });
  };

  onInputChange = e => this.setState({[e.target.name]: e.target.value})

  onSelectChange = e => this.setState({selectedTime: e.target.value})

  onFormSubmit = e => {
    const { selectedTime, selectedDay, user, phone, todayClients, todayReservationTimes } = this.state
    e.preventDefault();
    const id = uuid();
    const client = {
      selectedDay,
      selectedTime,
      user,
      phone,
      id
    }
    console.log(client)
    clientStorage.addClient(client);
    todayClients.push(client);
    const newTimes = todayReservationTimes.filter(time => {
      return time.start !== selectedTime;
    });
    console.log(newTimes)
    this.setState({
      selectedTime: 'times',
      todayClients,
      todayReservationTimes: newTimes
    })
  }

  render() {
    const { selectedTime, selectedDay, date, todayReservationTimes } = this.state;
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const selectOptions = todayReservationTimes && todayReservationTimes.map((time, i) => {
      return <option
        key={i}
        value={time.start}
        >
        {`${selectedDay} ${time.start}-${time.end}`}
      </option>
    })
    return (
      <div>
        <p>Norėdami užsiregistruoti, pasirinkite žemiau esančiame kalendoriuje datą, tada žemiau esančiame, pasirinkime,
        išrinkite, tinkamą laiką, bei pasiruodžiusioje formoje, užpildykite, kontaktinius duomenis.</p>
        <p>{date.toLocaleDateString('lt-LT', dateOptions)}</p>
        <p>Rinkitės apsilankymo datą:</p>
        <Calendar
          minDate={new Date(Date.now())}
          onChange={this.onChange}
          value={date}
          locale="lt-LT"
        />
        {selectedDay !== '' ? <div>
          <p>Rinkitės apsilankymo laiką:</p>
          <select
            className='react-select'
            value={selectedTime}
            onChange={this.onSelectChange}
          >
            <option value='times'>Laikai:</option>
            {selectOptions}
          </select>
          {selectedTime !== 'times'  ?
            <ReservationForm
              reservationDay={selectedDay}
              reservationTime={selectedTime}
              onFormSubmit={this.onFormSubmit}
              onInputChange={this.onInputChange}
            /> : null}
        </div> : null
        }
      </div>
    );
  }
}

export default Reservation;