import React, { Component } from 'react';
import VenuesContainer from './VenuesContainer';
import ShowsContainer from './ShowsContainer';
import PerformancesContainer from './PerformancesContainer';
import LevelsContainer from './LevelsContainer';
import config from '../config/config';
import httpRequest from '../utils/httpRequest';
import { ticketContainerStyle } from '../../styles/ticketContainerStyle';

class TicketContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedVenue: {},
      selectedShow: {},
      selectedPerformance: {},
      selectedLevel: {}
    }
  }

  selectVenue = (id) => {
    const tempVenues = this.props.venues.slice();
    const index = tempVenues.findIndex(venue => venue.id === id);
    if (index !== -1 && id !== this.state.selectedVenue.id ) {
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
    if (index !== -1 && id !== this.state.selectedShow.id ) {
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

  selectLevel = (id) => {
    const tempLevels = this.state.selectedVenue.levels.slice();
    const index = tempLevels.findIndex(level => level.id === id);
    if (index !== -1 && id !== this.state.selectedLevel.id ) {
      this.setState({ 
        selectedLevel: tempLevels[index]
      });
    } else {
      this.setState({ selectedLevel: {} });
    }
  }

  selectPerformance = (selectedPerformance) => {
    const performanceIndex = this.state.selectedShow.performances.findIndex(performance => performance.id === selectedPerformance.value);
    const performance = performanceIndex !== -1 ? this.state.selectedShow.performances[performanceIndex] : {}
    this.setState({ selectedPerformance: performance });
  }

  // selectPerformance = (id) => {
  //   const tempPerformances = this.state.selectedShow.performances.slice();
  //   const index = tempPerformances.findIndex(performance => performance.id === id);
  //   if (index !== -1 ) {
  //     httpRequest.fetchJSON(`${config.venuesUrl}/${this.state.selectedVenue.id}/shows/${this.state.selectedShow.id}/performances/${id}`, 'GET')
  //     .then(response => {
  //       const performance = JSON.parse(response);
  //       this.setState({ 
  //         selectedPerformance: performance
  //       });
  //     })
  //     .catch(err => {
  //       console.log('Error in grabbing selected Performance', err);
  //     })
  //   } else {
  //     this.setState({ selectedPerformance: {} });
  //   }
  // }

  render() {
    const { venues, selectedCustomer } = this.props;
    const { selectedVenue, selectedShow, selectedLevel, selectedPerformance } = this.state;
    return ( 
      <div style={ticketContainerStyle}>
        {
          Object.keys(selectedCustomer).length !== 0 ?
          <VenuesContainer venues={venues} selectedVenue={selectedVenue} selectVenue={this.selectVenue}/> : null
        }
        {
          Object.keys(selectedVenue).length !== 0 ? 
          <ShowsContainer shows={selectedVenue.shows} selectedShow={selectedShow} selectShow={this.selectShow} /> : null
        }
        {
          Object.keys(selectedShow).length !== 0 ? 
          <LevelsContainer levels={selectedVenue.levels} selectedLevel={selectedLevel} selectLevel={this.selectLevel} /> : null
        }
        {
          Object.keys(selectedShow).length !== 0 ? 
          <PerformancesContainer performances={selectedShow.performances} selectedPerformance={selectedPerformance} selectPerformance={this.selectPerformance} /> : null
        }
      </div>
    )
  }
}
 
export default TicketContainer;