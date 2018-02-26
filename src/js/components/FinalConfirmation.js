import React, { Component } from 'react';
import cardStyles from '../../styles/cardStyle';
import dialogStyles from '../../styles/dialogStyle';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class FinalConfirmation extends Component {
  render() {
    const {
      openFinal,
      confirmRegistration,
      confirm
    } = this.props;
    return ( 
      <Dialog onClose={confirmRegistration} open={openFinal}>
        <DialogTitle>Reservation Confirmed</DialogTitle>
        <DialogContent style={dialogStyles.contentContainer}>
          <div style={dialogStyles.infoBox}>
            <div style={cardStyles.title}>
              Please save these details for any questions regarding your reservation.
            </div>
            <div>
              <div style={cardStyles.sectionTitle}>Email</div>
              <div style={cardStyles.sectionContent}>{confirm.customer.email}</div>
            </div>
            <div>
              <div style={cardStyles.sectionTitle}>Expiration Date</div>
              <div style={cardStyles.sectionContent}>{new Date(confirm.expiration).getMonth() + 1}/{new Date(confirm.expiration).getDate()}/{new Date(confirm.expiration).getFullYear()} at {new Date(confirm.expiration).toLocaleTimeString('en-US')}</div>
            </div>
            <div>
              <div style={cardStyles.sectionTitle}>Reservation Number</div>
              <div style={cardStyles.sectionContent}>{confirm.reservationNumber}</div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmRegistration} style={cardStyles.button} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
 
export default FinalConfirmation;