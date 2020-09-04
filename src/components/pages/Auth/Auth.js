import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import IconButton from '@material-ui/core/IconButton';
import AccountCircleTwoTone from '@material-ui/icons/AccountCircleTwoTone';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import './Auth.scss';

class Auth extends React.Component {
  state = {
    anchorEl: null,
  }

  handleMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  signOutUser = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { anchorEl } = this.state;
    const { auth } = this.props;

    if (auth) {
      return (
      <div>
        <IconButton
          className="account-icon"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircleTwoTone className="account-icon" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>New</MenuItem>
          <MenuItem onClick={this.handleClose}>My Stuff</MenuItem>
          <MenuItem onClick={this.signOutUser}>Logout</MenuItem>
        </Menu>
      </div>
      );
    }
    return null;
  }
}

export default Auth;
