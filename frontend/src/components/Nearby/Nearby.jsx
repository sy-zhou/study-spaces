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
      emptyRooms: [],
      showNearby: false
    };
  }

  render() {
    return (
      <div className="nearby">
        <Form
          className="queryform"
          key={`${this.props.match.params.building}`}
          defaultBuilding={this.state.building}
          selectBuilding={this.selectBuilding}
          showRoomField={false}
          submit={this.showAvailabilityTable}
          buttonText={"Find Nearby"}
        />

        <div className="results">
          <Route
            path='/nearby/:building'
            render={(props) => {
              return (
                <AvailabilityTable
                  key={`${this.props.match.params.building}`}
                  refreshTable={this.state.showNearby}
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
    this.setState({ showNearby: false });
    this.setState({ building: b });
  }

  selectRoom = r => {
    this.setState({ showNearby: false });
    this.setState({ room: r });
  }

  showAvailabilityTable = () => {
    this.setState({ showNearby: true });
    this.props.history.push(`/nearby/${this.state.building}`);
  }

  componentDidUpdate(prevProps) {
    const prevParams = prevProps.match.params;
    const currParams = this.props.match.params;
    if (currParams.building != prevParams.building) {
      this.setState({
        building: this.props.match.params.building
      });
    }
  }
}
