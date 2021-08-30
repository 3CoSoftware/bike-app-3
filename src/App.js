import { Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store'
import { useEffect } from 'react';

import NavBar from "./components/Navbar/NavBar"
import Ride from "./components/Ride2"
import Success from "./components/Success"
import {Home} from "./components/Home"

import history from './history'

import { loadUser } from './actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  console.log("App")

  useEffect(() => {
    console.log("App useEffect()");
    store.dispatch(loadUser())
}, [])


  return (
    <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact={true} path="/" render={() => <NavBar><Home /></NavBar>}></Route>
            <Route path="/ride" render={() => <NavBar><Ride /></NavBar>}></Route>
            <Route path="/success" render={() => <NavBar><Success /></NavBar>}></Route>
        </Switch>
      </Router>
  </Provider>
  );
}

export default App;
