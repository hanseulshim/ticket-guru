import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import styles from '../../styles/headerStyles';

class Header extends Component {
  filterVenues = (evt) => {
    this.props.filterVenues(evt.target.value);
  }

  render() { 
    return ( 
      <div style={styles.container}>
        <div>
          <h1 style={styles.title}>Ticket Guru!</h1>
          <h2 style={styles.subtitle}>Select a venue below or search for it on the right</h2>
        </div>
        <TextField
          className="search-bar"
          id="search"
          label="Search for a venue"
          type="search"
          onChange={this.filterVenues}
        />
      </div>
    )
  }
}
 
export default Header;