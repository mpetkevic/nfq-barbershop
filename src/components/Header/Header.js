import React from 'react';
import {Link} from 'react-router-dom'
import './Header.scss';

const Header = () => {
  return (
    <div className='Header'>
      <Link to='/'><h1>Kirpejas.com</h1></Link>
      <nav>
        <Link to='/reservation'>Rezervacija</Link>
        <Link to='/reservation-list'>Klientų rezervacijos</Link>
      </nav>
    </div>
  );
};

export default Header;