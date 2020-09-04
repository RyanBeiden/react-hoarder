import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connection';
import MyNavbar from '../components/pages/MyNavbar/MyNavbar';
import Home from '../components/pages/Home/Home';
import NewItem from '../components/pages/NewItem/NewItem';
import Stuff from '../components/pages/Stuff/Stuff';
import EditItem from '../components/pages/EditItem/EditItem';
import SingleItem from '../components/pages/SingleItem/SingleItem';
import Auth from '../components/pages/Auth/Auth';

import './App.scss';

connection();

// const PublicRoute = ({ component: Component, authed, ...rest }) => {
//   const routeChecker = (props) => (authed === false
//     ? (<Component {...props} />)
//     : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
//   return <Route {...rest} render={(props) => routeChecker(props)} />;
// };

// const PrivateRoute = ({ component: Component, authed, ...rest }) => {
//   const routeChecker = (props) => (authed === true
//     ? (<Component {...props} />)
//     : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
//   return <Route {...rest} render={(props) => routeChecker(props)} />;
// };

class App extends React.Component {
  state = {
    loading: true,
    authed: false,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true, loading: false });
      } else {
        this.setState({ authed: false, loading: false });
      }
    });
  }

  routeChecker = () => {
    const { authed } = this.state;

    if (authed) {
      return (
        <Switch>
          <Route path="/home">
            <Home authed={authed} />
          </Route>
          <Route path="/new">
            <NewItem authed={authed} />
          </Route>
          <Route path="/stuff">
            <Stuff authed={authed} />
          </Route>
          <Route path="/edit/:itemId">
            <EditItem authed={authed} />
          </Route>
          <Route path="/items/:itemId">
            <SingleItem authed={authed} />
          </Route>
        </Switch>
      );
    } if (authed === false) {
      return (
        <Switch>
          <Route path="/auth"><Auth authed={authed}/></Route>
          <Redirect from="*" to="/new" />
        </Switch>
      );
    }

    return null;
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
              {this.routeChecker()}
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
