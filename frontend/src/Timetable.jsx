import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import './Timetable.css';

export default class Timetable extends Component {
  state = {
    times: [],
    events: [
      // initial event data
      { title: "Event Now", start: new Date() },
      { start: new Date('2019-12-30 11:30'), end: new Date('2019-12-30 15:30') }
    ]
  };

  render() {
    return (
      <div className="timetable">
        {/* <Table>
          <thead>
            <tr>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ this.formatTimesOnWeekday("M") }</td>
              <td>{ this.formatTimesOnWeekday("T(?!h)") }</td>
              <td>{ this.formatTimesOnWeekday("W") }</td>
              <td>{ this.formatTimesOnWeekday("Th") }</td>
              <td>{ this.formatTimesOnWeekday("F") }</td>
            </tr>
          </tbody>
        </Table>
        {
          this.state.times.map(time => {
            return (<div>{time.weekdays} {time.start_time} {time.end_time} </div>);

          })
        } */}
        <div>
          <FullCalendar
            defaultView="timeGridWeek"
            height={"parent"}
            header={{
              left: "",
              right: "timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[dayGridPlugin, timeGridPlugin]}
            weekends={false}
            events={this.state.events}
            // titleFormat={{ year: 'numeric', month: '2-digit', day: '2-digit' }}
            columnHeaderFormat={{weekday: 'long'}}
            minTime={"7:00:00"}
            scrollTime={"8:00:00"}
            allDaySlot={false}
          />
        </div>
      </div>
    );
  }

  isTenMinutesApart(endTime, startTime) {
    const milliseconds = ((new Date("2017-05-02T" + startTime)) - (new Date("2017-05-02T" + endTime)));
    return (milliseconds / (60000)) == 10;
  }

  formatTimesOnWeekday(weekday) {
    // deep copy times to temp
    let temp = this.state.times.filter(time => time.weekdays.match(new RegExp(weekday)))
      .sort((a,b) => (a.start_time > b.start_time) ? 1 : ((b.start_time > a.start_time) ? -1 : 0))
      .reduce((a, b) => { if (a.length == 0 || a[a.length - 1].start_time != b.start_time) a.push(b); return a; }, [])
      .map(a => Object.assign({}, a));
    if (temp === undefined || temp.length == 0) return [];
    let final = [temp[0]];
    for (let i = 1; i < temp.length; ++i) {
      if (this.isTenMinutesApart(final[final.length - 1].end_time, temp[i].start_time)) {
        final[final.length - 1].end_time = temp[i].end_time;
      } else {
        final.push(temp[i]);
      }
    }
    // this.state.events = temp.map(a => {
    //   return ({
    //     title: "e",
    //     start: new Date('2019-12-30 ' + a.start),
    //     end: new Date('2019-12-30 ' + a.end),
    //   });
    // })
    // .map(a => Object.assign({}, a));
    return final.map(time => <div>{time.start_time} - {time.end_time}</div> )
  }
  
  callAPI() {
    const { building, room } = this.props;
    fetch(`http://localhost:8000/api/building/${building}/${room}/courses`)
    .then(res => res.json())
    .then(res => this.setState({ times: res }))
    .catch(err => err);
  }
  componentDidMount() {
    this.callAPI();
  }

}
