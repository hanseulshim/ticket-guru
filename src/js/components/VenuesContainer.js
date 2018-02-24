import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import cardStyles from '../../styles/cardStyle';
import styles from '../../styles/venuesContainerStyle';

class VenuesContainer extends Component {

  createCards = (venue, id) => {
    const selected = this.props.selectedVenueID === venue.id;
    return (
      <Card style={selected ? cardStyles.selectedCard : cardStyles.card} key={id}>
        <CardContent>
          <div style={cardStyles.title}>
            {venue.name}
          </div>
          <div>
            <div style={cardStyles.sectionTitle}>Description</div>
            <div style={cardStyles.sectionContent}>{venue.description}</div>
          </div>
          <div>
            <div style={cardStyles.sectionTitle}>Address</div>
            <div style={cardStyles.sectionContent}>{venue.address}</div>
          </div>
          <div>
            <div style={cardStyles.sectionTitle}>URL</div>
            <a style={cardStyles.sectionContent} href={venue.url} target='_blank'>{venue.url}</a>
          </div>
        </CardContent>
        <CardActions>
          <Button style={cardStyles.button} onClick={() => this.props.selectVenue(venue.id)} size="small">{`${selected ? 'Unselect Venue' : 'Select Venue'}`}</Button>
        </CardActions>
      </Card>
    )
  }

  render() {
    const { venues } = this.props;
    const venueList = venues.map(this.createCards);

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>
          Select a Venue
        </h1>
        <div style={cardStyles.container}>
          {venueList}
        </div>
      </div>
    )
  }
}
 
export default VenuesContainer;