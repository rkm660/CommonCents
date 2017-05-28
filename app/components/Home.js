import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';


class Home extends React.Component {
  render() {
    return (
	    <div className="map">
		      <GoogleMapReact
		      	bootstrapURLKeys={{
		    		key: 'AIzaSyAdqfAwbQF958j96OH54VTZijOfZtHWeDI',
		    		language: 'us',
		  		}}
		        defaultCenter={this.props.center}
		        defaultZoom={this.props.zoom}
		      >
		      </GoogleMapReact>
	    </div>
    );
  }
}

Home.defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
};

Home.propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
};



export default Home;