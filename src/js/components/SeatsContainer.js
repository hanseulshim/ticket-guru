import React, { Component } from 'react';
import styles from '../../styles/sectionContainerStyle';

import Select from 'react-select';
import '../../styles/react-select.css';

class SeatsContainer extends Component {

  render() {
    const { seatsAvailable } = this.props;

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>
          Available Seats - {seatsAvailable}
        </h1>
      </div>
    )
  }
}
 
export default SeatsContainer;