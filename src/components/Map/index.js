import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { MapsApiKey } from '../../config';

const mapStyles = {
  width: '100%',
  height: '480px'
};

export class MapContainer extends Component {
  render() {
    return (
        <Map
            google={this.props.google}
            zoom={13}
            style={mapStyles}
            initialCenter={this.props.center}
            >
                {this.props.children}
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: MapsApiKey,
})(MapContainer);