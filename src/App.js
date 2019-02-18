import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './main.scss';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Reservation from './components/Reservation/Reservation';
import ReservationList from './components/ReservationList/ReservationList';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/reservation' component={Reservation}/>
            <Route exact path='/reservation-list' component={ReservationList}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
