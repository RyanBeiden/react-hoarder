import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Auth from '../Auth/Auth';

import './MyNavbar.scss';

class Navbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  signOutUser = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;

    const buildAuthData = () => {
      if (authed) {
        return <Auth signOutUser={this.signOutUser}/>;
      }
      return <Button className="sign-in-button" variant="contained" onClick={this.loginClickEvent}>Sign In</Button>;
    };

    return (
      <div className="root">
        <AppBar position="static" className="AppBar">
          <Toolbar>
            <Typography variant="h6" className="title">
              Hoarder
            </Typography>
            {buildAuthData()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;
