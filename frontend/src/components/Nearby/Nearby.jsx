import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Form from '../Form/Form';
import AvailabilityTable from '../AvailabilityTable/AvailabilityTable';

import './Nearby.css';

export default class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      building: props.match.params.building,
      room: props.match.params.room,
      emptyRooms: [],
      showNearby: false
    };
  }

  render() {
    return (
      <div className="nearby">
        <Form
          className="queryform"
          defaultBuilding={this.state.building}
          defaultRoom={this.state.room}
          selectBuilding={this.selectBuilding}
          selectRoom={this.selectRoom}
          submit={this.showAvailabilityTable}
          buttonText={"Find Nearby"}
        />

        <div className="results">
          <Route
            path='/nearby/:building/:room'
            render={(props) => <AvailabilityTable {...props} refreshTable={this.state.showNearby}/>}
          />
        </div>
      </div>
    );
  }

  selectBuilding = b => {
    this.setState({ showNearby: false });
    this.setState({ building: b });
  }

  selectRoom = r => {
    this.setState({ showNearby: false });
    this.setState({ room: r });
  }

  showAvailabilityTable = () => {
    this.setState({ showNearby: true });
    this.props.history.push(`/nearby/${this.state.building}/${this.state.room}`);
  }
}
