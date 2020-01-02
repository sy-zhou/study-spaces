import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Search from './Search';
import Nearby from './Nearby';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light" variant="light">
          <Nav className="mr-auto">
            <Nav.Link href="/">Search any Room</Nav.Link>
            <Nav.Link href="/nearby">Find Open Rooms Nearby</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path='/' component={Search} />
          <Route path='/nearby' component={Nearby} />
        </Switch>
      </div>
    );
  }
}

export default App;
