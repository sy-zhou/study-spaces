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

  selectBuilding = e => {
    this.setState({ showCalendar: false });
    this.setState({ building: e.target.value });
  }

  selectRoom = e => {
    this.setState({ showCalendar: false });
    this.setState({ room: e.target.value });
  }

  showCalendar = () => {
    this.setState({ showCalendar: true });
  }
}
