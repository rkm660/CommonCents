import React from 'react';
import PropTypes from 'prop-types';
import MapView from './MapView'
import RaffleNavbar from './RaffleNavbar'


class Raffle extends React.Component {
  render() {
    return (
    <div>
    	<RaffleNavbar/>
    	<MapView/>
    </div>
    );
  }
}

export default Raffle;