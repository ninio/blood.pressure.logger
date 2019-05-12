import React from 'react';

import { TouchableOpacity, StyleSheet, Button, Text, View } from 'react-native';

import { Camera, Permissions } from 'expo';
// import { ImagePicker } from 'expo';

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
		this.state = {
			hasCameraPermission: null,
			type: Camera.Constants.Type.back,
		};

	}

	async componentDidMount () {
		const { status } = await Permissions.askAsync( Permissions.CAMERA );
		this.setState( { hasCameraPermission: status === 'granted' } );
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
		const { hasCameraPermission } = this.state;
		if ( hasCameraPermission === null ) {
			return <View />;
		} else if ( hasCameraPermission === false ) {
			return <Text>No access to camera</Text>;
		} else {
			return (
				<View style={ { flex: 1 } }>
					<View style={ { flex: 1 } }>
						<Camera style={ { flex: 1 } } type={ this.state.type }>
							<View
								style={ {
									flex: 1,
									backgroundColor: 'transparent',
									flexDirection: 'row',
								} }>
								<TouchableOpacity
									style={ {
										flex: 0.1,
										alignSelf: 'flex-end',
										alignItems: 'center',
									} }
									onPress={ () => {
										this.setState( {
											type: this.state.type === Camera.Constants.Type.back
												? Camera.Constants.Type.front
												: Camera.Constants.Type.back,
										} );
									} }>
									<Text
										style={ { fontSize: 18, marginBottom: 10, color: 'white' } }>
										{ ' ' }Flip{ ' ' }
									</Text>
								</TouchableOpacity>
							</View>
						</Camera>
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