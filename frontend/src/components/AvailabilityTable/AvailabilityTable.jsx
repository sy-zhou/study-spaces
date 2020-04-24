import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

export default class AvailabilityTable extends Component {
  state = {
    emptyRooms: []
  };

  render() {
    return (
      <Table className={this.props.className}>
        <thead>
          <tr>
            <th>Room</th>
            <th>Available Until</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.emptyRooms.map(room => {
              return (
                <tr key={room.room}>
                  <td>{room.room}</td>
                  <td>Available until {room.time || "closing"}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    );
  }

  findEmptyRooms = async () => {
    const { building, room } = this.props.match.params;
    let emptyRooms = [];
    let possibleRooms = await fetch(`http://localhost:8000/api/building/${building}/rooms`)
      .then(res => res.json());
    const numRooms = possibleRooms.length;
    for (let i = 0; i < numRooms; ++i) {
      let roomSchedule = await fetch(`http://localhost:8000/api/building/${building}/${possibleRooms[i]}/courses`)
      .then(res => res.json());
      // TODO: make less messy
      const date = new Date();
      const day = date.getDay();
      const currentTime = date.toLocaleTimeString(navigator.language, {hourCycle: "h24", hour: '2-digit', minute:'2-digit'});
      let dayString = "";
      if (day === 1) dayString = "M";
      else if (day === 2) dayString = "T(?!h)";
      if (day === 3) dayString = "W";
      if (day === 4) dayString = "Th";
      if (day === 5) dayString = "F";
      const classes = roomSchedule.filter(time => time.weekdays.match(new RegExp(dayString)))
        .sort((a,b) => (a.start_time > b.start_time) ? 1 : ((b.start_time > a.start_time) ? -1 : 0))
        .reduce((a, b) => { if (a.length == 0 || a[a.length - 1].start_time != b.start_time) a.push(b); return a; }, [])
      
      if (!classes.find(a => a.start_time <= currentTime && a.end_time > currentTime)) {
        const nextClass = classes.find(a => a.start_time > currentTime);
        emptyRooms.push({ "room": possibleRooms[i], "time": (nextClass ? nextClass.start_time : nextClass)});
      }
    }
    this.setState({ emptyRooms: emptyRooms });
  }

  componentDidMount() {
    this.findEmptyRooms();
  }

  componentDidUpdate(prevProps) {
    if (this.props.refreshTable && prevProps.refreshTable != this.props.refreshTable) {
      this.findEmptyRooms();
    }
  }
}
