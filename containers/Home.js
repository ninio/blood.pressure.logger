import React from 'react';

import { StyleSheet, Text, View, ToolbarAndroid, FlatList } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

import MeasurementListItem from './../components/MeasurementListItem.js';
import LoadingIndicator from './../components/LoadingIndicator.js';

import storage from './../middleware/localStorage.js';


export default class Home extends React.Component {
	static navigationOptions = {
		title: 'BloodPressureLogger',
		headerStyle: {
			backgroundColor: '#aa3333',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			color: '#fff'
		}
	}

	static getDerivedStateFromProps ( props ) {
		let { getParam } = props.navigation;
		let measurements = getParam( 'measurements' );
		if ( measurements ) {
			return {
				measurements
			}
		}

		return null;
	}

	constructor ( props ) {
		// Props are super
		super( props );

		this.state = {
			initialMeasurements: null,
			measurements: null
		}
	}
	render () {
		let { measurements, initialMeasurements } = this.state;
		let { navigate } = this.props.navigation;

		if ( !measurements ) {
			measurements = initialMeasurements
		}

		return (
			<View style={ { flex: 1, backgroundColor: '#eee' } }>

				<View style={ styles.container }>
					{ measurements ?
						( <FlatList
							data={ measurements.map( measurement => ( { key: measurement.date, ...measurement } ) ) }
							renderItem={ measurement => ( <MeasurementListItem { ...measurement } /> ) }
							ListEmptyComponent={ () => <Text>No measurements</Text> }
						/> )
						: <LoadingIndicator /> }
				</View>
				<View>
					<ActionButton
						onPress={ () => {
							navigate( 'AddMeasurement', {
								measurements
							} )
						} }
						style={ {
							container: {
								backgroundColor: "#841584"
							}
						} }
						icon={ <Ionicons name="md-add" size={ 32 } color="white" /> }
						accessibilityLabel="Add a measurement" />
				</View>
			</View>
		);
	}

	componentDidMount () {
		storage.getItem( 'storedMeasurements' )
			.then( data => {
				if ( data ) {
					this.setState( {
						initialMeasurements: data
					} );
				}
				else {
					this.setState( {
						initialMeasurements: []
					} )
				}
			} )
			.catch( err => {
				console.log( '** Problemos **' );
				console.log( err );
			} );
	}
}

const styles = StyleSheet.create( {
	container: {
		height: '100%',
		flex: 1,
		flexDirection: 'row',
	},
	list: {
		paddingLeft: 16,
		paddingBottom: 48,
	},
	toolbar: {
		backgroundColor: '#aa3333',
		height: 56,
		alignSelf: 'stretch',
	}
} );
