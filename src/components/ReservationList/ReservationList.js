import React, {Component} from 'react';
import Calendar from 'react-calendar';
import ClientInfo from '../ClientInfo/ClientInfo';
import * as clientStorage from '../../clientStorage';
import './ReservationList.scss';

class ReservationList extends Component {
  state = {
    date: new Date(),
    selectedDay: '',
    clients: [],
    clientInput: '',
    activeContent: 2
  }

  componentDidMount() {
    const selectedDay = this.state.date.toLocaleString('lt-LT', { year: 'numeric', month: 'numeric', day: 'numeric' });
    this.setState({
      clients: clientStorage.getClients(),
      selectedDay
    })
  }

  onChange = date => {
    const selectedDay = date.toLocaleString('lt-LT', { year: 'numeric', month: 'numeric', day: 'numeric' });
    const clients = clientStorage.getClients().filter(client => {
      return client.selectedDay === selectedDay
    })
    this.setState({ date,  selectedDay, clients});
  };

  onInputChange = e => this.setState({[e.target.name]: e.target.value})

  onButtonClick = activeContent => this.setState({
    activeContent,
    clients: clientStorage.getClients(),
    clientInput: '',
  })

  removeReservation = (e, id) => {
    e.preventDefault();
    clientStorage.removeClient(id);
    const clients = this.state.clients;
    const newClients = clients.filter(client => {
      return client.id !== id
    })
    this.setState({clients: newClients})
  }

  render () {
    const {clients, clientInput, activeContent } = this.state;
    console.log(clients)
    const clientsList = clients && clients.filter((client) => {
        if(client.user.toLowerCase().includes(clientInput.toLowerCase())){
          return client;
        }
        return;
      }).map((client) => <ClientInfo key={client.id} clientInfo={client} removeClient={this.removeReservation}/>)
    const searchOptions = [
      <Calendar
        minDate={new Date(Date.now())}
        onChange={this.onChange}
        value={this.state.date}
        locale="lt-LT"
      />,
      <div className='searchByName'>
        <label htmlFor="clientInput">Įveskite kliento Vardą Pavardę:{'    '}</label>
        <input type="text" name="clientInput" onChange={this.onInputChange}/>
      </div>, null

    ]
    return (
      <div className='reservationList'>
        <p>Kirpėjos, norinčios pasižiūrėti, klientų sąrašą, pagal datą, spaudžia mygtuką "Pagal datą".</p>
        <p>Kirpėjos, norinčios surasti klientą, pagal vardą, pavardę, spaudžia mygtuką "Pagal Vardą Pavardę".
        Atsiradusiame laukelyje, rašant vardą, pavardę, automatiškai vyksta filtracija.</p>
        <p>Kirpėjos, norinčios matyti visą klientų sąrašą, spaudžia mygtuką "Rodyti visas rezervacijas".</p>
        <p>Kirpėjos, norinčios atšaukti, tam tikrą rezervacija, spaudžia mygtuką "Atšaukti", esantį rezervacijoje.</p>
        <div className="search-options">
          <button
            onClick={() => this.onButtonClick(0)}
            className={activeContent === 0 ? 'active' : null}
          >Pagal datą</button>
          <button
            onClick={() => this.onButtonClick(1)}
            className={activeContent === 1 ? 'active' : null}
          >Pagal Vardą Pavardę</button>
          <button
            onClick={() => this.onButtonClick(2)}
            className={activeContent === 2 ? 'active' : null}
          >Rodyti visas rezervacijas</button>

        </div>

        {searchOptions[this.state.activeContent]}


        <h2>Klientų rezervacijos</h2>
        {clientsList}
      </div>
    );
  }
};

export default ReservationList;