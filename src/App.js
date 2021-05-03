import { Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

import NavBar from "./components/NavBar"
import Table from "./components/Table"
import Ride from "./components/Ride"
import Success from "./components/Success"

import history from './history'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
  </Provider>
  );
}

export default App;
