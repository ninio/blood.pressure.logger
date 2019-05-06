import React from 'react';

import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

import PickerRange from './../components/PickerRange.js';

import storage from './../middleware/localStorage.js';


const initialMeasurements = {
	low: 80,
	high: 120,
	pulse: 60
};

export default class AddMeasurement extends React.Component {
	static navigationOptions = {
		title: 'Take a picture of your measurement',
		headerStyle: {
			backgroundColor: '#aa3333',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#fff'
		}
	}

	constructor ( props ) {
		// Props are super
		super( props );

		this.state = {
			...initialMeasurements
		}

		this.onConfirmAdd = this.onConfirmAdd.bind( this );
	}

	onConfirmAdd ( previousMeasurements, { low, high, pulse } ) {
		let now = new Date();
		let measurements = [ ...previousMeasurements, {
			id: previousMeasurements.length,
			date: now.toISOString(),
			measurementData: { low, high, pulse }
		} ];

		storage.setItem( 'storedMeasurements', measurements );

		return measurements;
	}


	render () {
		return (
			<View style={ { flex: 1 } }>
				<View style={ styles.container }>
					<Text>SAP</Text>
					<PickerRange
						onValueChange={ ( value ) =>
							this.setState( { high: value } )
						}
						start={ 30 }
						end={ 300 }
						value={ this.state.high } />
					<Text>DAP</Text>
					<PickerRange
						onValueChange={ ( value ) =>
							this.setState( { low: value } )
						}
						start={ 30 }
						end={ 200 }
						value={ this.state.low } />
					<Text>Pulse</Text>
					<PickerRange
						onValueChange={ ( value ) =>
							this.setState( { pulse: value } )
						}
						start={ 10 }
						end={ 200 }
						value={ this.state.pulse } />
				</View>
				<View>
					<ActionButton
						onPress={ () => {
							let { navigation } = this.props;
							let { navigate, getParam } = navigation;
							let newMeasurements = this.onConfirmAdd( getParam( 'measurements' ), this.state );
							navigate( 'Home', {
								measurements: newMeasurements
							} );
						} }
						style={ {
							container: {
								backgroundColor: "#009688"
							}
						} }
						icon={ <Ionicons name="md-checkmark" size={ 32 } color="white" /> }
						accessibilityLabel="Add a measurement" />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingLeft: 16,
		paddingTop: 16
	},
	toolbar: {
		backgroundColor: '#aa3333',
		height: 56,
		alignSelf: 'stretch',
	}
} );