import { Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store'

import NavBar from "./components/NavBar"
import Table from "./components/Table"
import Ride from "./components/Ride"
import Success from "./components/Success"

import history from './history'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
        <Router history={history}>
          
          <NavBar />

          <Route path="/" exact>
            <Table />
          </Route>

          <Route path="/ride">
            <Ride />
          </Route>

          <Route path="/success">
            <Success />
          </Route>

        </Router>
  </Provider>
  );
}

export default App;
