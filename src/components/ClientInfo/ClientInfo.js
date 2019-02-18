import React from 'react';
import './ClientInfo.scss';

const ClientInfo = (props) => {
  return (
      props.clientInfo !== undefined ?
        <div className='client'>
          <span>
            <span className='bold'>Klientas: </span> {props.clientInfo.user},
            <span className='bold'>Telefonas: </span> {props.clientInfo.phone},
            <span className='bold'>Pasirinktas laikas: </span>{props.clientInfo.selectedDay} {props.clientInfo.selectedTime}
          </span>
          <span
            className="delete" onClick={(e) => props.removeClient(e,props.clientInfo.id)}
          >Atšaukti</span>
        </div> : null

  );
};

export default ClientInfo;