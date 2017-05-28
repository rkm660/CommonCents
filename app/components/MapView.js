import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';


class MapView extends React.Component {
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

MapView.defaultProps = {
    center: [39.50, -98.35],
    zoom: 4,
};

MapView.propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
};



export default MapView;