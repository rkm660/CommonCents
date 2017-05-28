import React from 'react';
import PropTypes from 'prop-types';
import Raffle from './Raffle';


class Home extends React.Component {
  render() {
    return (
    	<div className="row">
    		<div className="col-sm-4">
    		
    		</div>
    		<div className="col-sm-8">	
    			<Raffle/>
    		</div>
    	</div>
    );
  }
}




export default Home;