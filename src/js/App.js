import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import Header from './components/Header';
import TicketContainer from './components/TicketContainer';

class App extends Component {
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
