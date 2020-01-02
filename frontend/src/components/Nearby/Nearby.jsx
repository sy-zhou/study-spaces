import React, { Component } from 'react';
import Calendar from '../Calendar/Calendar';
import Form from '../Form/Form';

export default class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building: "",
      room: "",
      emptyRooms: []
      // showCalendar: false
    };
  }

  render() {
    return (
      <div className="nearby">
        <Form
          selectBuilding={this.selectBuilding}
          selectRoom={this.selectRoom}
          submit={this.findEmptyRooms}
          buttonText={"Find Nearby"}
        />

        {/* { this.state.showCalendar && this.state.room != "" &&
          <Calendar building={this.state.building} room={this.state.room}/>
        } */}
      </div>
    );
  }

  selectBuilding = e => {
    this.setState({ showCalendar: false });
    this.setState({ building: e.target.value });
  }

  selectRoom = e => {
    this.setState({ showCalendar: false });
    this.setState({ room: e.target.value });
  }

  findEmptyRooms = () => {
    console.log("ha");
    // fetch for empty rooms
  }

  // showCalendar = () => {
  //   this.setState({ showCalendar: true });
  // }
}
