import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Search from '../Search/Search';
import Nearby from '../Nearby/Nearby';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light" variant="light">
          <Nav className="mr-auto">
            <Nav.Link href="/">Search Any Room</Nav.Link>
            <Nav.Link href="/nearby">Find Open Rooms Nearby</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route path='/nearby/:building/:room' component={Nearby} />
          <Route path='/nearby' component={Nearby} />
          <Route path='/:building/:room' component={Search} />
          <Route path='/' component={Search} />
        </Switch>
      </div>
    );
  }
}

export default App;
