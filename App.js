import React from 'react';
import { View } from 'react-native';

import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

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

const bplTheme = {
	palette: {
		primaryColor: '#aa3333'
	}
}

export default class App extends React.Component {
	constructor ( props ) {
		// Props are super
		super( props );
	}

	render () {
		return (
			<View style={ { flex: 1 } }>
				<ThemeContext.Provider value={ getTheme( bplTheme ) }>
					<AppContainer />
				</ThemeContext.Provider>
			</View>
		);
	}
}
