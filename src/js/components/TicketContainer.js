import React, { Component } from 'react';
import VenuesContainer from './VenuesContainer';
import ShowsContainer from './ShowsContainer';
import config from '../config/config';
import httpRequest from '../utils/httpRequest';
import { ticketContainerStyle } from '../../styles/ticketContainerStyle';

class TicketContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedVenue: {},
      selectedShow: {}
    }
  }

  selectVenue = (id) => {
    const tempVenues = this.props.venues.slice();
    const index = tempVenues.findIndex(venue => venue.id === id);
    if (index !== -1 ) {
      httpRequest.fetchJSON(`${config.venuesUrl}/${id}`, 'GET')
      .then(response => {
        const venue = JSON.parse(response);
        this.setState({ 
          selectedVenue: venue
        });
      })
      .catch(err => {
        console.log('Error in grabbing selected Venue', err);
      })
    } else {
      this.setState({ selectedVenue: {} });
    }
  }

  selectShow = (id) => {
    const tempShows = this.state.selectedVenue.shows.slice();
    const index = tempShows.findIndex(show => show.id === id);
    if (index !== -1 ) {
      httpRequest.fetchJSON(`${config.venuesUrl}/${this.state.selectedVenue.id}/shows/${id}`, 'GET')
      .then(response => {
        const show = JSON.parse(response);
        this.setState({ 
          selectedShow: show
        });
      })
      .catch(err => {
        console.log('Error in grabbing selected Show', err);
      })
    } else {
      this.setState({ selectedShow: {} });
    }
  }

  render() {
    const { venues } = this.props;
    const { selectedVenue, selectedShow } = this.state;
    return ( 
      <div style={ticketContainerStyle}>
        <VenuesContainer venues={venues} selectedVenueID={selectedVenue.id} selectVenue={this.selectVenue}/>
        {
          Object.keys(selectedVenue).length !== 0 ? 
          <ShowsContainer shows={selectedVenue.shows} selectedShowID={selectedShow.id} selectShow={this.selectShow} /> : null
        }
      </div>
    )
  }
}
 
export default TicketContainer;