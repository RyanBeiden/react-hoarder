import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import AccountCircleTwoTone from '@material-ui/icons/AccountCircleTwoTone';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CallMadeIcon from '@material-ui/icons/CallMade';

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

  render() {
    const { anchorEl } = this.state;
    const { signOutUser, authed } = this.props;

    return (
      <div className="Auth">
        {authed
          ? <div>
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
              className="menu-container"
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
              <Link to="/stuff/new" className="menu-link"><MenuItem onClick={this.handleClose} className="new-item">New</MenuItem></Link>
              <Link to="/stuff" className="menu-link"><MenuItem onClick={this.handleClose} className="my-stuff">My Stuff</MenuItem></Link>
              <MenuItem onClick={signOutUser} className="logout-button">Logout</MenuItem>
            </Menu>
          </div>
          : <div className="Auth__page-title">
              <h1>YOU ARE A HOARDER...<br/>
                So Sign In
              <CallMadeIcon className="Auth__arrow-icon" />
              </h1>
            </div>
        }
      </div>
    );
  }
}

export default Auth;
