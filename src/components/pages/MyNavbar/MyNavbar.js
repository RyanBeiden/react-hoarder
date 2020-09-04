import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    authed: PropTypes.bool,
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

    return (
      <div className="root">
        <AppBar position="static" className="AppBar">
          <Toolbar>
            <Typography variant="h6" className="title">
              <Link to="/home" className="logo-link">Hoarder</Link>
            </Typography>
            {authed
              ? <Auth signOutUser={this.signOutUser} authed={authed}/>
              : <Button className="sign-in-button" variant="contained" onClick={this.loginClickEvent}>Sign In</Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;
