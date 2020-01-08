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
      <div className={this.props.className}>
        <Form>
          <Form.Group controlId="form.building">
            <Form.Label>Building Code</Form.Label>
            <Form.Control as="select" onChange={this.selectBuilding} value={this.props.defaultBuilding}>
              {
                this.state.buildings.map(b => {
                  return (<option key={b.building} value={b.building}>{b.building}</option>);
                })
              }
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="form.room">
            <Form.Label>Room Number</Form.Label>
            <Form.Control as="select" onChange={this.selectRoom} value={this.props.defaultRoom}>
              <option></option>
              {
                this.state.rooms.map(room => {
                  return (<option key={room} value={room}>{room}</option>);
                })
              }
            </Form.Control>
          </Form.Group>
        </Form>
        <Button type="submit" onClick={this.props.submit}>
          {this.props.buttonText || "Search"}
        </Button>
      </div>
    );
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch("http://localhost:8000/api/buildings")
    .then(res => res.json())
    .then(res => {
      this.setState({ buildings: res }, () => {
        // manually trigger selectBuilding event handler
        const b = this.props.defaultBuilding ? this.props.defaultBuilding : this.state.buildings[0].building;
        this.props.selectBuilding(b);
        this.refreshRooms(b);
      })
    })
    .catch(err => err);
  }

  selectBuilding = e => {
    this.props.selectBuilding(e.target.value);
    this.refreshRooms(e.target.value);
  }

  selectRoom = e => {
    this.props.selectRoom(e.target.value);
  }

  refreshRooms = building => {
    let { buildings } = this.state;
    this.setState({ rooms: buildings.find(b => b.building === building).rooms});
  }

}
