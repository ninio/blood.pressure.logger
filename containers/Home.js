import React from 'react';

import { StyleSheet, Text, View, ToolbarAndroid, FlatList } from 'react-native';
import { ActionButton, Button } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

import MeasurementListItem from './../components/MeasurementListItem.js';
import LoadingIndicator from './../components/LoadingIndicator.js';
import NoMeasurements from './../components/NoMeasurements.js';
import MeasurementsChart from './../components/MeasurementsChart';

import storage from './../middleware/localStorage.js';


import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import translations from './../translations.js';

i18n.fallbacks = true;
i18n.translations = translations;
i18n.locale = Localization.locale;

export default class Home extends React.Component {
	static navigationOptions = {
		title: i18n.t( 'siteTitle' ),
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
			view: 'list', // 'list' or 'chart'
			initialMeasurements: null,
			measurements: null
		}
	}
	render () {
		let { measurements, initialMeasurements, view } = this.state;
		let { navigate } = this.props.navigation;

		if ( !measurements ) {
			measurements = initialMeasurements
		}

		return (
			<View style={ { flex: 1, backgroundColor: '#eee' } }>
				<View style={ styles.viewToggleContainer }>
					<Button
						primary={ view === 'list' }
						text="List"
						onPress={ () => this.setState( { view: 'list' } ) } />
					<Button
						primary={ view === 'chart' }
						text="Chart"
						onPress={ () => this.setState( { view: 'chart' } ) } />
				</View>
				<View style={ styles.container }>
					{ measurements ?
						( view === 'list' ?
							<FlatList
								data={ measurements.map( measurement => ( { key: measurement.date, ...measurement } ) ) }
								renderItem={ measurement => ( <MeasurementListItem { ...measurement } /> ) }
								ListEmptyComponent={ () => <NoMeasurements style={ styles.noMeasurements } headingStyle={ styles.noMeasurementsHeading } subtextStyle={ styles.noMeasurementsSubText } /> }
							/>
							: <MeasurementsChart measurements={ measurements } /> )
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
	},
	noMeasurements: {
		paddingTop: 36,
		paddingHorizontal: 16,
	},
	noMeasurementsHeading: {
		fontSize: 24
	},
	noMeasurementsSubText: {
		fontSize: 16
	},
	viewToggleContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	}
} );
