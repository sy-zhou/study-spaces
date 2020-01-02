import React, { Component } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import './Calendar.css';

export default class Calendar extends Component {
  calendarComponentRef = React.createRef();

  state = {
    times: [],
    events: []
  };

  render() {
    return (
      <div className="calendar">
        <FullCalendar
          ref={this.calendarComponentRef}
          defaultView="timeGridWeek"
          visibleRange={{
            start: '2020-06-01',
            end: '2020-06-05'
          }}
          header={{
            left: "",
            right: "timeGridWeek,timeGridDay,listWeek"
          }}
          plugins={[dayGridPlugin, timeGridPlugin]}
          weekends={false}
          events={this.state.events}
          // titleFormat={{ year: 'numeric', month: '2-digit', day: '2-digit' }}
          columnHeaderFormat={{weekday: 'long'}}
          minTime={"6:00:00"}
          scrollTime={"8:00:00"}
          allDaySlot={false}
        />
      </div>
    );
  }

  formatTimesOnWeekday(weekday) {
    // deep copy times to temp
    let temp = this.state.times.filter(time => time.weekdays.match(new RegExp(weekday)))
      .sort((a,b) => (a.start_time > b.start_time) ? 1 : ((b.start_time > a.start_time) ? -1 : 0))
      .reduce((a, b) => { if (a.length == 0 || a[a.length - 1].start_time != b.start_time) a.push(b); return a; }, [])
      .map(a => Object.assign({}, a));
    
    let day = "01";
    if (weekday == "T(?!h)") day = "02";
    if (weekday == "W") day = "03";
    if (weekday == "Th") day = "04";
    if (weekday == "F") day = "05";

    return temp.map(a => {
      return ({
        start: new Date("2020-06-" + day + " " + a.start_time),
        end: new Date("2020-06-" + day + " " + a.end_time),
      });
    })
  }
  
  formatTimes() {
    let temp = [];
    temp = temp.concat(this.formatTimesOnWeekday("M"));
    temp = temp.concat(this.formatTimesOnWeekday("T(?!h)"));
    temp = temp.concat(this.formatTimesOnWeekday("W"));
    temp = temp.concat(this.formatTimesOnWeekday("Th"));
    temp = temp.concat(this.formatTimesOnWeekday("F"));
    this.setState({ events: temp });
  }

  componentDidMount() {
    const { building, room } = this.props;
    // call API
    fetch(`http://localhost:8000/api/building/${building}/${room}/courses`)
      .then(res => res.json())
      .then(res => this.setState({ times: res }, () => this.formatTimes()))
      .catch(err => err);
    // display calender
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2020-06-01");
  }

}
