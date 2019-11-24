import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

import i18n from 'i18n-js';

import PickerRange from './../components/PickerRange.js';

import storage from './../middleware/localStorage.js';



const initialMeasurements = {
	low: 80,
	high: 120,
	pulse: 60
};

export default class AddMeasurement extends React.Component {
	static navigationOptions = {
		title: i18n.t( 'addMeasurementTitle' ),
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
					<Text>{ i18n.t( 'SAP' ) } / { i18n.t( 'DAP' ) }</Text>
					<View style={ styles.sapDapPickersContainer }>
						<PickerRange
							onValueChange={ ( value ) =>
								this.setState( { high: value } )
							}
							start={ 30 }
							end={ 300 }
							width={ 80 }
							height={ 200 }
							initialValue={ initialMeasurements.high } />
						<View style={ styles.sapDapDivider }>
							<Text>/</Text>
						</View>
						<PickerRange
							onValueChange={ ( value ) =>
								this.setState( { low: value } )
							}
							start={ 30 }
							end={ 200 }
							width={ 80 }
							height={ 200 }
							initialValue={ initialMeasurements.low } />
					</View>
					<Text>{ i18n.t( 'pulse' ) }</Text>
					<View style={ styles.pulsePickerContainer }>
						<PickerRange
							onValueChange={ ( value ) =>
								this.setState( { pulse: value } )
							}
							start={ 10 }
							end={ 200 }
							width={ 140 }
							height={ 200 }
							initialValue={ initialMeasurements.pulse } />
					</View>
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
	},
	sapDapPickersContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	sapDapDivider: {
		height: 200,
		alignItems: 'center',
		justifyContent: 'center'
	},
	pulsePickerContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	}
} );
