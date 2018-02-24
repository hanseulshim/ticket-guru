import React, { Component } from 'react';

class TicketContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="hero-body">
        <div className="container has-text-centered">
          <p className="title">
            Title
          </p>
          <p className="subtitle">
            Subtitle
          </p>
        </div>
      </div>
    )
  }
}
 
export default TicketContainer;