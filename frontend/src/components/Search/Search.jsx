import React, { Component } from 'react';
import Form from '../Form/Form';
import Calendar from '../Calendar/Calendar';
import './Search.css';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building: "",
      room: "",
      showCalendar: false
    };
  }

  render() {
    return (
      <div className="search">
        <Form
          className="queryform"
          selectBuilding={this.selectBuilding}
          selectRoom={this.selectRoom}
          submit={this.showCalendar}
        />

        { this.state.showCalendar && this.state.room != "" &&
          <Calendar building={this.state.building} room={this.state.room}/>
        }
      </div>
    );
  }

  selectBuilding = b => {
    this.setState({ showCalendar: false });
    this.setState({ building: b });
  }

  selectRoom = r => {
    this.setState({ showCalendar: false });
    this.setState({ room: r });
  }

  showCalendar = () => {
    this.setState({ showCalendar: true });
  }
}
