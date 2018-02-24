import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import cardStyles from '../../styles/cardStyle';
import styles from '../../styles/venuesContainerStyle';

class ShowsContainer extends Component {

  createCards = (show, id) => {
    const selected = this.props.selectedShowID === show.id;
    return (
      <Card style={selected ? cardStyles.selectedCard : cardStyles.card} key={id}>
        <CardContent>
          <div style={cardStyles.title}>
            {show.name}
          </div>
          <div>
            <div style={cardStyles.sectionTitle}>Description</div>
            <div style={cardStyles.sectionContent}>{show.description}</div>
          </div>
          <div>
            <div style={cardStyles.sectionTitle}>URL</div>
            <a style={cardStyles.sectionURL} href={show.url} target='_blank'>{show.url}</a>
          </div>
        </CardContent>
        <CardActions>
          <Button style={cardStyles.button} onClick={() => this.props.selectShow(show.id)} size="small">{`${selected ? 'Unselect Show' : 'Select Show'}`}</Button>
        </CardActions>
      </Card>
    )
  }

  render() {
    const { shows } = this.props;
    const showList = shows.map(this.createCards);

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>
          Select a Show
        </h1>
        <div style={cardStyles.container}>
          {showList}
        </div>
      </div>
    )
  }
}
 
export default ShowsContainer;