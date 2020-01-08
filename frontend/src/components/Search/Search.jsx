import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Form from '../Form/Form';
import Calendar from '../Calendar/Calendar';
import './Search.css';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building: props.match.params.building,
      room: props.match.params.room,
      showCalendar: false
    };
  }

  render() {
    return (
      <div className="search">
        <Form
          className="queryform"
          defaultBuilding={this.state.building}
          defaultRoom={this.state.room}
          selectBuilding={this.selectBuilding}
          selectRoom={this.selectRoom}
          submit={this.showCalendar}
        />

        <Route
          path='/:building/:room'
          render={(props) => <Calendar {...props} refreshCalendar={this.state.showCalendar}/>}
        />
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
    this.props.history.push(`/${this.state.building}/${this.state.room}`);
  }
}
