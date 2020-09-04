import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';

import Skeleton from '@material-ui/lab/Skeleton';

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

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const RoutesContainer = ({ authed }) => {
  if (authed === null) {
    return (
      <div className="root-skeleton">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
    );
  }
  return (
    <div className="route-container">
      <Switch>
        <PrivateRoute path="/stuff/new" component={NewItem} authed={authed} />
        <PrivateRoute path="/edit/:itemId" component={EditItem} authed={authed} />
        <PrivateRoute path="/stuff/:itemId" component={SingleItem} authed={authed} />
        <PrivateRoute path="/home" component={Home} authed={authed} />
        <PrivateRoute path="/stuff" component={Stuff} authed={authed} />
        <PublicRoute path="/auth" component={Auth} authed={authed} />
        <Redirect from="*" to="/home" />
      </Switch>
    </div>
  );
};

class App extends React.Component {
  state = {
    authed: null,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} />
            <RoutesContainer authed={authed} />
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
