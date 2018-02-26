import React, { Component } from 'react';
import cardStyles from '../../styles/cardStyle';
import dialogStyles from '../../styles/dialogStyle';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class ConfirmationDialog extends Component {
  render() {
    const {
      openConfirm,
      handleClose,
      handleConfirm,
      selectedCustomer,
      selectedVenue,
      selectedShow,
      selectedLevel,
      selectedPerformance,
      confirm
    } = this.props;
    return ( 
      <Dialog onClose={handleClose} open={openConfirm}>
        <DialogTitle>Confirm Reservation</DialogTitle>
        <DialogContent style={dialogStyles.contentContainer}>
          <div style={dialogStyles.infoBox}>
            <div style={cardStyles.title}>
              Customer Information
            </div>
            <div>
              <div style={cardStyles.sectionTitle}>Name</div>
              <div style={cardStyles.sectionContent}>{selectedCustomer.firstName} {selectedCustomer.lastName}</div>
            </div>
            <div>
              <div style={cardStyles.sectionTitle}>Email</div>
              <div style={cardStyles.sectionContent}>{selectedCustomer.email}</div>
            </div>
          </div>
          <div style={dialogStyles.infoBox}>
            <div style={cardStyles.title}>
              Event Information
            </div>
            <div>
              <div style={cardStyles.sectionTitle}>Venue</div>
              <div style={cardStyles.sectionContent}>{selectedVenue.name}</div>
            </div>
            <div>
              <div style={cardStyles.sectionTitle}>Show</div>
              <div style={cardStyles.sectionContent}>{selectedShow.name}</div>
            </div>
            <div>
              <div style={cardStyles.sectionTitle}>Level</div>
              <div style={cardStyles.sectionContent}>{selectedLevel.name}</div>
            </div>
            <div>
              <div style={cardStyles.sectionTitle}>Performance Time</div>
              <div style={cardStyles.sectionContent}>{new Date(selectedPerformance.showTime).getMonth() + 1}/{new Date(selectedPerformance.showTime).getDate()}/{new Date(selectedPerformance.showTime).getFullYear()} at {new Date(selectedPerformance.showTime).toLocaleTimeString('en-US')}</div>
            </div>
            <div>
              <div style={cardStyles.sectionTitle}>Number of Seats</div>
              <div style={cardStyles.sectionContent}>{confirm.seats ? confirm.seats.length : 0}</div>
            </div>
            <div>
              <div style={cardStyles.sectionTitle}>Total Price</div>
              <div style={cardStyles.sectionContent}>${confirm.seats ? confirm.seats.length * selectedLevel.price : 0}</div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={cardStyles.button}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} style={cardStyles.button} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
 
export default ConfirmationDialog;