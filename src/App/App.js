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

const PublicRoute = ({ component: Component, auth, ...rest }) => {
  const routeChecker = (props) => (auth === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const routeChecker = (props) => (auth === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

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
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar auth={auth}/>
            <div className="route-container">
              <Switch>
                <PrivateRoute path="/home" component={Home} auth={auth} />
                <PrivateRoute path="/new" component={NewItem} auth={auth} />
                <PrivateRoute path="/stuff" component={Stuff} auth={auth} />
                <PrivateRoute path="/edit/:itemId" component={EditItem} auth={auth} />
                <PrivateRoute path="/items/:itemId" component={SingleItem} auth={auth} />
                <PublicRoute path="/auth" component={Auth} auth={auth} />
                <Redirect from="*" to="/home" />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
