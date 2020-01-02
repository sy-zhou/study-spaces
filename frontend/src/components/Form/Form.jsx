import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class QueryForm extends Component {
  state = {
    buildings: [],
    rooms: []
  }

  render() {
    return (
      <div className="queryform">
        <Form>
          <Form.Group controlId="form.building">
            <Form.Label>Building Code</Form.Label>
            <Form.Control as="select" onChange={this.selectBuilding}>
              {
                this.state.buildings.map(building => {
                  return (<option key={building.code}>{building.code}</option>);
                })
              }
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="form.room">
            <Form.Label>Room Number</Form.Label>
            <Form.Control as="select" onChange={this.props.selectRoom}>
              <option></option>
              {
                this.state.rooms.map(room => {
                  return (<option key={room}>{room}</option>);
                })
              }
            </Form.Control>
          </Form.Group>
        </Form>
        <Button type="submit" onClick={this.props.submit}>{this.props.buttonText || "Search"}</Button>
      </div>
    );
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch("http://localhost:8000/api/buildings")
    .then(res => res.json())
    .then(res => this.setState({ buildings: res }))
    .catch(err => err);
  }

  selectBuilding = (e) => {
    this.props.selectBuilding(e);
    this.refreshRooms(e.target.value);
  }

  refreshRooms = building => {
    let { state } = this;
    state.rooms = state.buildings.find(b => b.code === building).rooms;
  }

}
