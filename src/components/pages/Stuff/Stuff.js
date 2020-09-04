import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import './Stuff.scss';

class Stuff extends React.Component {
  render() {
    return (
      <div className="Stuff">
        <h1>Stuff</h1>
        <Link to="/stuff/12345" className="stuff-links"><Button variant="contained" color="primary" className="mat-button">Single</Button></Link>
        <Link to="/edit/12345" className="stuff-links"><Button variant="contained" color="secondary" className="mat-button">Edit</Button></Link>
      </div>
    );
  }
}

export default Stuff;
