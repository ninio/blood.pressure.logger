import React from 'react';
import { StyleSheet, Text, View, ToolbarAndroid, Button } from 'react-native';

import { createStackNavigator } from 'react-navigation';

import MeasurementListItem from './components/MeasurementListItem.js';

import storage from './middleware/localStorage.js';

import Home from './containers/Home.js';
import AddMeasurement from './containers/AddMeasurement.js';

export default class App extends React.Component {
  constructor ( props ) {
    // Props are super
    super( props );

    this.state = {
      currentView: 'home',
      measurements: []
    };

    this.onPressAddMeasurement = this.onPressAddMeasurement.bind( this )
    this.onActionSelected = this.onActionSelected.bind( this )
    this.onConfirmAdd = this.onConfirmAdd.bind( this )
  }

  render() {
    let { measurements } = this.state;
    // let measurementsList = [];
    let currentView;


    switch( this.state.currentView ) {
      case 'add-measurement' :
        currentView = (
          <AddMeasurement
            onConfirm={ this.onConfirmAdd }
            onActionSelected={ this.onActionSelected }
            />
        );
        break;
      case 'home' :
      default :
        currentView = (
          <Home
            measurements={ measurements }
            onPressAddMeasurement={ this.onPressAddMeasurement }
            onActionSelected={ this.onActionSelected }
            />
        );
    }

    // for( let measurement of measurements ) {
    //   measurementsList.push(
    //     <MeasurementListItem key={ measurement.date } { ...measurement } />
    //    )
    // }

    return (
      <View style={{ flex: 1 }}>
        { currentView }
      </View>
    );
  }
  onActionSelected ( action ) {
    storage.setItem( 'storedMeasurements', [] );
    console.log( action );
  }

  onPressAddMeasurement (  ) {
    this.setState({
      currentView: 'add-measurement'
    });
  }

  onConfirmAdd ({ low, high, pulse }) {
    let now = new Date();
    let measurements = [ ...this.state.measurements, {
        id: this.state.measurements.length,
        date: now.toISOString(),
        measurementData: { low, high, pulse }
      } ];

    console.log( now.getTimezoneOffset() / 60 );

    this.setState({
      measurements,
      currentView: 'home'
    });

    storage.setItem( 'storedMeasurements', measurements );
  }

  componentDidMount() {
    storage.getItem( 'storedMeasurements' )
      .then( data => {
        console.log( data );
        if( data ) {
          this.setState({
            measurements: data
          });
        }
      } )
      .catch( err => {
        console.log( '** Problemos **' );
        console.log( err );
      } );
  }

}
