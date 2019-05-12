import React from 'react';

import { StyleSheet, Button, Text, View } from 'react-native';

import { ImagePicker } from 'expo';

import { ActionButton } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

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


	pickImage = async () => {
		let pickedImage = await ImagePicker.launchImageLibraryAsync( {
			mediaTypes: 'Images',
			quality: 1,
			base64: true,

		} );

		if ( !pickedImage.cancelled ) {
			let imageData = pickedImage.base64;
			// TODO: detect measurement
		}
	}

	render () {
		return (
			<View style={ { flex: 1 } }>
				<View style={ styles.container }>
					<Button
						onPress={ this.pickImage }
						title="Take a picture of your measurement" ></Button>
				</View>
				<View>
					<Button
						onPress={ () => {
							let { navigation } = this.props;
							let { navigate, getParam } = navigation;

							navigate( 'AddMeasurement', {
								measurements: getParam( 'measurements' )
							} );
						} }
						title="Add Manually" />
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