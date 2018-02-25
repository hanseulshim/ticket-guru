import React, { Component } from 'react';
import Header from './components/Header';
import CustomerContainer from './components/CustomerContainer';
import TicketContainer from './components/TicketContainer';

import config from './config/config';
import httpRequest from './utils/httpRequest';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      venues: [],
      filteredVenues: [],
      customers: [],
      selectedCustomer: {}
    }
  }

  componentDidMount() {
    Promise.all([httpRequest.fetchJSON(config.venuesUrl, 'GET'), httpRequest.fetchJSON(config.customerUrl, 'GET')])
    .then(responses => {
      const venues = JSON.parse(responses[0]);
      const customers = JSON.parse(responses[1]);
      this.setState({ 
        venues: venues,
        filteredVenues: venues,
        customers: customers
      });
    })
    .catch(err => {
      console.log('Error in grabbing initial request', err);
    })
  }

  filterVenues = (str) => {
    const tempVenues = this.state.venues.slice();
    const filteredVenues = tempVenues.filter(venue => venue.name.toLowerCase().includes(str));
    this.setState({ filteredVenues });
  }

  selectCustomer = (selectedCustomer) => {
    const customerIndex = selectedCustomer === null ? -1 : this.state.customers.findIndex(customer => customer.id === selectedCustomer.value);
    const customer = customerIndex !== -1 ? this.state.customers[customerIndex] : {}
    this.setState({ selectedCustomer: customer });
  }

  render() {
    const { venues, filteredVenues, customers, selectedCustomer } = this.state;
    return (
      <div className="App">
        <div>
          <Header venues={venues} filterVenues={this.filterVenues}/>
          <CustomerContainer selectCustomer={this.selectCustomer} selectedCustomer={selectedCustomer} customers={customers}/>
          <TicketContainer venues={filteredVenues} selectedCustomer={selectedCustomer}/>
        </div>
      </div>
    );
  }
}

export default App;
