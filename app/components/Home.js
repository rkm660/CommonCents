import React from 'react';
import PropTypes from 'prop-types';
import Raffle from './Raffle';


class Home extends React.Component {
  render() {
    return (
    	<div className="row map-container">		
    		<Raffle/>
    	</div>
    );
  }
}




export default Home;