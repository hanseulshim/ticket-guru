import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import styles from '../../styles/sectionContainerStyle';
import cardStyles from '../../styles/cardStyle';

class SeatsContainer extends Component {

  render() {
    const { seatsAvailable, requestReservation, numSeats, updateNumSeats } = this.props;

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>
          Available Seats - {seatsAvailable}
        </h1>
        <TextField
          id="number"
          label="Number of seats requested"
          value={numSeats}
          onChange={updateNumSeats}
          type="number"
          style={styles.textField}
        />
        <div>
          <Button variant="raised" style={cardStyles.button} onClick={requestReservation}>
            Make a Reservation
          </Button>
        </div>
      </div>
    )
  }
}
 
export default SeatsContainer;