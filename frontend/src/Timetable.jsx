import React, { Component } from 'react';
import './Timetable.css';

class Timetable extends Component {
  state = {
    times: []
  };

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

  render() {
    return (
      <div className="timetable">
        {
          this.state.times.map(time => {
            return (<div>{time.weekdays} {time.start_time} {time.end_time} </div>);

          })
        }
      </div>
    );
  }
}

export default Timetable;