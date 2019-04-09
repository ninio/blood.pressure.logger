import React from 'react';

import { StyleSheet, Text, View, ToolbarAndroid, FlatList } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

import MeasurementListItem from './../components/MeasurementListItem.js';
// import { FlatList } from 'react-native-gesture-handler';

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
		if( measurements ) {
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
			measurements: []
		}
	}
	render() {
		let { measurements } = this.state;
		let { navigate } = this.props.navigation;
		// let measurementsList = [];

		// if( measurements ) {
		// 	measurementsList = this.props.measurements.map( measurement =>
		// 			( <MeasurementListItem key={ measurement.date } { ...measurement } /> )
		// 	);
		// }
		// else {
		// 	console.log( 'Problemos' );
		// }


		return (
			<View style={{ paddingTop: Expo.Constants.statusBarHeight, flex: 1 }}>
				{/* <ToolbarAndroid
					style={ styles.toolbar }
					title="Blood Pressure Logger"
					navIcon={ require( './../img/heart-meter.svg' ) }
					onActionSelected={ this.props.onActionSelected }
					titleColor= '#fff'
					actions = {[
							{
								title: 'Log out',
								show: 'never'
							}
						]}
					/> */}
				<View style={styles.container}>
					{ measurements?
						(<FlatList
							data={ measurements.map( measurement => ({ key: measurement.date, ...measurement }) ) }
							renderItem={ measurement => ( <MeasurementListItem { ...measurement } /> ) }
							ListEmptyComponent={ () => <Text>No measurements</Text> }
							style={ styles.list } />)
						: null  }
				</View>
				<View>
					<ActionButton
						onPress={ () => { navigate( 'AddMeasurement', {
							measurements
						} ) } }
						style={{
							container: {
								backgroundColor:"#841584"
							}
						}}
						icon={ <Ionicons name="md-add" size={32} color="white" /> }
						accessibilityLabel="Add a measurement" />
				</View>
			</View>
		);
	}

	componentDidMount() {
		storage.getItem( 'storedMeasurements' )
			.then( data => {
				// console.log( data );
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

const styles = StyleSheet.create({
	container: {
		height: '100%',
		flex: 1,
		flexDirection: 'row',
		// backgroundColor: '#aff',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	list: {
		paddingTop: 16,
		paddingLeft: 16,
		paddingBottom: 48,
	},
	toolbar: {
		backgroundColor: '#aa3333',
		height: 56,
		alignSelf: 'stretch',
		// titleColor: '#fff',
		// textAlign: 'center',
	}
});
