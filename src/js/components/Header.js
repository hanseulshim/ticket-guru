import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import style from '../../styles/headerStyle';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

const Header = (props) => {
  const { classes } = props;
  
  return (
    <div style={style}>
      <div>
        <h1 className="title">Ticket Guru!</h1>
        <h1 className="subtitle">Select a venue below or search for it on the right</h1>
      </div>
      <TextField
        className="search-bar"
        id="search"
        label="Search for a venue"
        type="search"
        // onChange={this.handleChange}
        className={classes.textField}
      />
    </div>
  );
}

export default withStyles(styles)(Header);