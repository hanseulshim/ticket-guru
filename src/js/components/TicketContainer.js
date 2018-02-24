import React, { Component } from 'react';
import VenuesContainer from './VenuesContainer'
import { ticketContainerStyle } from '../../styles/ticketContainerStyle';

class TicketContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedVenue: {}
    }
  }

  selectVenue = (id) => {
    const tempVenues = this.props.venues.slice();
    const index = tempVenues.findIndex(venue => venue.id === id);
    const selectedVenue = (index !== -1 && id !== this.state.selectedVenue.id) ? tempVenues[index] : {};
    this.setState({ selectedVenue });
  }

  render() {
    const { venues } = this.props;
    const { selectedVenue } = this.state;
    return ( 
      <div style={ticketContainerStyle}>
        <VenuesContainer venues={venues} selectedVenueID={selectedVenue.id} selectVenue={this.selectVenue}/>
      </div>
    )
  }
}
 
export default TicketContainer;