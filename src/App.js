import { Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store'
import { useEffect } from 'react';

import NavBar from "./components/Navbar/NavBar"
import Ride from "./components/Ride2"
import Success from "./components/Success"
import EditNote from "./components/EditNote"
import {Home} from "./components/Home"

import history from './history'

import { loadUser } from './actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
}, [])


  return (
    <Provider store={store}>
        <Router history={history}>
          
          <NavBar />

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/ride">
            <Ride />
          </Route>

          <Route path="/edit">
            <EditNote />
          </Route>
          
          <Route path="/success">
            <Success />
          </Route>

        </Router>
  </Provider>
  );
}

export default App;
