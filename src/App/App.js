import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connection';
import MyNavbar from '../components/pages/MyNavbar/MyNavbar';

import './App.scss';

connection();

class App extends React.Component {
  state = {
    auth: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ auth: true });
      } else {
        this.setState({ auth: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { auth } = this.state;

    return (
      <div>
        <MyNavbar auth={auth}/>
      </div>
    );
  }
}

export default App;
