import React, { Component } from 'react';
import VenuesContainer from './VenuesContainer';
import ShowsContainer from './ShowsContainer';
import PerformancesContainer from './PerformancesContainer';
import LevelsContainer from './LevelsContainer';
import SeatsContainer from './SeatsContainer';
import ConfirmationDialog from './ConfirmationDialog';
import FinalConfirmation from './FinalConfirmation';
import config from '../config/config';
import httpRequest from '../utils/httpRequest';
import { ticketContainerStyle } from '../../styles/ticketContainerStyle';

class TicketContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedVenue: {},
      selectedShow: {},
      selectedLevel: {},
      selectedPerformance: {},
      numSeats: 0,
      openConfirm: false,
      openFinal: false,
      confirm: {}
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
          selectedVenue: venue,
          selectedShow: {},
          selectedLevel: {},
          selectedPerformance: {}
        });
      })
      .catch(err => {
        console.log('Error in grabbing selected Venue', err);
      })
    } else {
      this.setState({ 
        selectedVenue: {},
        selectedShow: {},
        selectedLevel: {},
        selectedPerformance: {}
      });
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
          selectedShow: show,
          selectedLevel: {},
          selectedPerformance: {}
        });
      })
      .catch(err => {
        console.log('Error in grabbing selected Show', err);
      });
    } else {
      this.setState({ 
        selectedShow: {},
        selectedLevel: {},
        selectedPerformance: {}
      });
    }
  }

  selectLevel = (id) => {
    const tempLevels = this.state.selectedVenue.levels.slice();
    const index = tempLevels.findIndex(level => level.id === id);
    if (index !== -1 && id !== this.state.selectedLevel.id ) {
      if (this.state.selectedPerformance.id) {
        httpRequest.fetchJSON(`${config.venuesUrl}/${this.state.selectedVenue.id}/shows/${this.state.selectedShow.id}/performances/${this.state.selectedPerformance.id}/availability?levelName=${tempLevels[index].name}`, 'GET')
        .then(response => {
          const seatsAvailable = JSON.parse(response);
          const performance = Object.assign({}, this.state.selectedPerformance);
          performance.seatsAvailable = seatsAvailable;
          this.setState({ 
            selectedPerformance: performance
          });
        })
        .catch(err => {
          console.log('Error in grabbing Available Seats', err);
        })
      }
      this.setState({ 
        selectedLevel: tempLevels[index]
      });
    } else {
      this.setState({ selectedLevel: {} });
    }
  }

  selectPerformance = (selectedPerformance) => {
    const index = selectedPerformance === null ? -1 : this.state.selectedShow.performances.findIndex(performance => performance.id === selectedPerformance.value);
    if (index !== -1) {
      httpRequest.fetchJSON(`${config.venuesUrl}/${this.state.selectedVenue.id}/shows/${this.state.selectedShow.id}/performances/${selectedPerformance.value}`, 'GET')
      .then(response => {
        const performance = JSON.parse(response);
        if (this.state.selectedLevel.id) {
          httpRequest.fetchJSON(`${config.venuesUrl}/${this.state.selectedVenue.id}/shows/${this.state.selectedShow.id}/performances/${selectedPerformance.value}/availability?levelName=${this.state.selectedLevel.name}`, 'GET')
          .then(response => {
            const seatsAvailable = JSON.parse(response);
            performance.seatsAvailable = seatsAvailable;
            this.setState({ 
              selectedPerformance: performance
            });
          })
          .catch(err => {
            console.log('Error in grabbing Available Seats', err);
          })
        } else {
          this.setState({ 
            selectedPerformance: performance
          });
        }
      })
      .catch(err => {
        console.log('Error in grabbing selected Performance', err);
      });
    } else {
      this.setState({ selectedPerformance: {}  });
    }
  }

  updateNumSeats = (evt) => {
    this.setState({ numSeats: evt.target.value });
  }

  requestReservation = () => {
    const url = `${config.venuesUrl}/${this.state.selectedVenue.id}/shows/${this.state.selectedShow.id}/performances/${this.state.selectedPerformance.id}/reservations`;
    const reqObj = {
      customer: {
        email: this.props.selectedCustomer.email
      },
      seatRequests: [
        {
          level: {
            name: this.state.selectedLevel.name
          },
          numSeats: this.state.numSeats
        }
      ]
    }

    httpRequest.fetchJSON(url, 'POST', reqObj)
    .then(response => {
      const result = JSON.parse(response);
      this.handleOpen();
      this.setState({ confirm: result });
    })
    .catch(err => {
      console.log('Error with getting reservation response', err);
    });
  }

  confirmRegistration = () => {
    const url = `${config.venuesUrl}/${this.state.selectedVenue.id}/shows/${this.state.selectedShow.id}/performances/${this.state.selectedPerformance.id}/reservations/${this.state.confirm.id}/confirm`;
    httpRequest.fetchJSON(url, 'POST')
    .then(() => {
      window.location.reload();
    })
    .catch(err => {
      console.log('Error with confirming registration', err);
    });
  }

  handleOpen = () => {
    this.setState({ openConfirm: true });
  }

  handleClose = () => {
    this.setState({ 
      openConfirm: false,
      openFinal: false
    });
  }

  handleConfirm = () => {
    this.setState({ 
      openConfirm: false,
      openFinal: true
    })
  }

  render() {
    const { venues, selectedCustomer } = this.props;
    const { selectedVenue, selectedShow, selectedLevel, selectedPerformance, numSeats, openConfirm, confirm, openFinal } = this.state;

    const venuesVisible = Object.keys(selectedCustomer).length !== 0;
    const showsVisible = venuesVisible && Object.keys(selectedVenue).length !== 0;
    const levelsVisible = showsVisible && Object.keys(selectedShow).length !== 0;
    const performancesVisible = levelsVisible && Object.keys(selectedLevel).length !== 0;
    const seatsVisible = performancesVisible && Object.keys(selectedPerformance).length !== 0;
    
    return ( 
      <div style={ticketContainerStyle}>
        {
          venuesVisible ?
          <VenuesContainer venues={venues} selectedVenue={selectedVenue} selectVenue={this.selectVenue}/> : null
        }
        {
          showsVisible ? 
          <ShowsContainer shows={selectedVenue.shows} selectedShow={selectedShow} selectShow={this.selectShow} /> : null
        }
        {
          levelsVisible ? 
          <LevelsContainer levels={selectedVenue.levels} selectedLevel={selectedLevel} selectLevel={this.selectLevel} /> : null
        }
        {
          performancesVisible ? 
          <PerformancesContainer performances={selectedShow.performances} selectedPerformance={selectedPerformance} selectPerformance={this.selectPerformance} /> : null
        }
        {
          seatsVisible ?
          <SeatsContainer seatsAvailable={selectedPerformance.seatsAvailable} numSeats={numSeats} updateNumSeats={this.updateNumSeats} requestReservation={this.requestReservation} /> : null
        }
        {
          openConfirm ?
          <ConfirmationDialog 
            openConfirm={openConfirm}
            handleClose={this.handleClose}
            handleConfirm={this.handleConfirm}
            selectedCustomer={selectedCustomer}
            selectedVenue={selectedVenue}
            selectedShow={selectedShow}
            selectedLevel={selectedLevel}
            selectedPerformance={selectedPerformance}
            confirm={confirm}
          /> : null
        }
        {
          openFinal ?
          <FinalConfirmation 
            openFinal={openFinal}
            confirmRegistration={this.confirmRegistration}
            selectedCustomer={selectedCustomer}
            selectedVenue={selectedVenue}
            selectedShow={selectedShow}
            selectedLevel={selectedLevel}
            selectedPerformance={selectedPerformance}
            confirm={confirm}
          /> : null
        }
      </div>
    )
  }
}
 
export default TicketContainer;