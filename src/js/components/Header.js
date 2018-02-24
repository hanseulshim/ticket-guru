import React from 'react';
import TextField from 'material-ui/TextField';
import style from '../../styles/headerStyle';

const Header = (props) => {
  
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
      />
    </div>
  );
}

export default Header;