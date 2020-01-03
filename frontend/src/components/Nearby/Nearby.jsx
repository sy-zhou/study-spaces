import React, { Component } from 'react';
import Calendar from '../Calendar/Calendar';
import Form from '../Form/Form';
import Table from 'react-bootstrap/Table';
import './Nearby.css';

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

        <Table className="results">
          <thead>
            <tr>
              <th>Room</th>
              <th>Available Until</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.emptyRooms.map(room => {
                return (<tr>
                  <td>{room.room}</td>
                  <td>{room.time}</td>
                </tr>);
              })
            }
          </tbody>
        </Table>

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

  findEmptyRooms = async () => {
    const { building, room } = this.state;
    let emptyRooms = [];
    let possibleRooms = await fetch(`http://localhost:8000/api/building/${building}/rooms`)
      .then(res => res.json());
    const numRooms = possibleRooms.length;
    for (let i = 0; i < numRooms; ++i) {
      let roomSchedule = await fetch(`http://localhost:8000/api/building/${building}/${possibleRooms[i]}/courses`)
      .then(res => res.json());
      // TODO: change to proper time stuff
      emptyRooms.push({ "room": possibleRooms[i], "time": roomSchedule[0].start_time});
    }
    this.setState({ emptyRooms: emptyRooms });
  }

  // showCalendar = () => {
  //   this.setState({ showCalendar: true });
  // }
}
