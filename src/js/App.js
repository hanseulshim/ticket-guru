import React, { Component } from 'react';
// import 'bulma/css/bulma.css'
import Header from './components/Header';
import TicketContainer from './components/TicketContainer';

import config from './config/config';
import httpRequest from './utils/httpRequest';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      venues: [],
      filteredVenues: []
    }
  }

  componentDidMount() {
    httpRequest.fetchJSON(config.venuesUrl, 'GET')
    .then(response => {
      const venues = JSON.parse(response);
      this.setState({ 
        venues: venues,
        filteredVenues: venues
      });
    })
    .catch(err => {
      console.log('Error in grabbing initial venues', err);
    })
  }

  filterVenues = (str) => {
    const tempVenues = this.state.venues.slice();
    const filteredVenues = tempVenues.filter(venue => venue.name.toLowerCase().includes(str));
    this.setState({ filteredVenues });
  }

  render() {
    const { venues, filteredVenues } = this.state;
    return (
      <div className="App">
        <div>
          <Header venues={venues} filterVenues={this.filterVenues}/>
          <TicketContainer venues={filteredVenues} />
        </div>
      </div>
    );
  }
}

export default App;
