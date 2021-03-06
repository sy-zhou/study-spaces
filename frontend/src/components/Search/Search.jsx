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
          key={`${this.props.match.params.building}${this.props.match.params.room}`}
          defaultBuilding={this.state.building}
          selectBuilding={this.selectBuilding}
          showRoomField={true}
          defaultRoom={this.state.room}
          selectRoom={this.selectRoom}
          submit={this.showCalendar}
        />

        <div className="calendar">
          <Route
            path='/:building/:room'
            render={(props) => {
              return (
                <Calendar
                  key={`${this.props.match.params.building}${this.props.match.params.room}`}
                  refreshCalendar={this.state.showCalendar}
                  {...props}
                />
              );
            }}
          />
        </div>
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

  componentDidUpdate(prevProps) {
    const prevParams = prevProps.match.params;
    const currParams = this.props.match.params;
    if (currParams.building != prevParams.building || currParams.room != prevParams.room) {
      this.setState({
        building: this.props.match.params.building,
        room: this.props.match.params.room
      });
    }
  }
}
