import React, { Component } from 'react';
import Calendar from './Calendar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Search.css';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      rooms: [],
      building: "",
      room: "",
      showTimeTable: false
    };
  }

  render() {
    return (
      <div className="search">
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
              <Form.Control as="select" onChange={this.selectRoom}>
                <option></option>
                {
                  this.state.rooms.map(room => {
                    return (<option key={room}>{room}</option>);
                  })
                }
              </Form.Control>
            </Form.Group>
          </Form>
          <Button type="submit" onClick={this.showTimes}>Search</Button>

        </div>

        { this.state.showTimeTable && this.state.room != "" &&
          <Calendar building={this.state.building} room={this.state.room}/>
        }
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

  refreshRooms = building => {
    let { state } = this;
    state.rooms = state.buildings.find(b => b.code === building).rooms;
  }

  selectBuilding = e => {
    this.setState({ showTimeTable: false });
    this.setState({ building: e.target.value });
    this.refreshRooms(e.target.value);
  }

  selectRoom = e => {
    this.setState({ showTimeTable: false });
    this.setState({ room: e.target.value });
  }

  showTimes = () => {
    this.setState({ showTimeTable: true });
  }
}
