import React from 'react';
import { View } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './containers/Home.js';
import AddMeasurement from './containers/AddMeasurement.js';
import AddMeasurementOCR from './containers/AddMeasurementOCR.js';

const AppNavigator = createStackNavigator( {
	Home: {
		screen: Home
	},
	AddMeasurement: {
		screen: AddMeasurement
	},
	AddMeasurementOCR: {
		screen: AddMeasurementOCR
	}
} );

const AppContainer = createAppContainer( AppNavigator );

export default class App extends React.Component {
	constructor ( props ) {
		// Props are super
		super( props );
	}

	render () {
		return (
			<View style={ { flex: 1 } }>
				<AppContainer />
			</View>
		);
	}
}
