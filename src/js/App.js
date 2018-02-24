import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import Header from './components/Header';
import TicketContainer from './components/TicketContainer';

import config from './config/config';
import httpRequest from './utils/httpRequest';

class App extends Component {
  componentDidMount() {
    httpRequest.fetchJSON(config.venuesUrl, 'GET')
    .then(result => {
      console.log('result', result);
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <Header />
          <TicketContainer />
        </div>
      </div>
    );
  }
}

export default App;
