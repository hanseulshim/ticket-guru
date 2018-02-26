import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import cardStyles from '../../styles/cardStyle';
import styles from '../../styles/sectionContainerStyle';

class LevelsContainer extends Component {

  createCards = (level, id) => {
    const selected = Object.keys(this.props.selectedLevel).length !== 0 && this.props.selectedLevel.id === level.id;
    return (
      <Card style={selected ? cardStyles.selectedCard : cardStyles.card} key={id}>
        <CardContent>
          <div style={cardStyles.title}>
            {level.name}
          </div>
          <div style={cardStyles.level.container}>
            <div style={cardStyles.level.item}>
              <div style={cardStyles.sectionTitleLevel}>Number of rows</div>
              <div style={cardStyles.sectionContent}>{level.numRows}</div>
            </div>
            <div style={cardStyles.level.item}>
              <div style={cardStyles.sectionTitleLevel}>Seats per Row</div>
              <div style={cardStyles.sectionContent}>{level.seatsPerRow}</div>
            </div>
            <div style={cardStyles.level.item}>
              <div style={cardStyles.sectionTitleLevel}>Seating Capacity</div>
              <div style={cardStyles.sectionContent}>{level.seatingCapacity}</div>
            </div>
            <div style={cardStyles.level.item}>
              <div style={cardStyles.sectionTitleLevel}>Price</div>
              <div style={cardStyles.sectionContent}>${level.price}</div>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button style={cardStyles.button} onClick={() => this.props.selectLevel(level.id)} size="small">{`${selected ? 'Unselect Level' : 'Select Level'}`}</Button>
        </CardActions>
      </Card>
    )
  }

  render() {
    const { levels } = this.props;
    const levelList = levels.map(this.createCards);

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>
          Select a Level
        </h1>
        <div style={cardStyles.container}>
          {levelList}
        </div>
      </div>
    )
  }
}
 
export default LevelsContainer;