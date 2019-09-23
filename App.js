import React from 'react';
import { View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './containers/Home.js';
import AddMeasurement from './containers/AddMeasurement.js';

const AppNavigator = createStackNavigator( {
	Home: {
		screen: Home
	},
	AddMeasurement: {
		screen: AddMeasurement
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
