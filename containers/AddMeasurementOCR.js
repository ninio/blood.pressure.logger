import React from 'react';

import { TouchableOpacity, WebView, StyleSheet, Button, Text, View } from 'react-native';

import { Camera, Permissions, ImagePicker } from 'expo';
// import { ImagePicker } from 'expo';

import { ActionButton } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

import RNTesseractOcr from 'react-native-tesseract-ocr';

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
			quality: 0,
			base64: true,
		} );

		if ( !pickedImage.cancelled ) {
			let photo = pickedImage;

			this.webview.injectJavaScript( 'resetImage()' );

			let data = "data:image/jpg;base64," + photo.base64;
			let index = 0;
			const BUFFER_SIZE = 10000;
			while ( index < data.length ) {
				this.webview.injectJavaScript( 'addImageData("' + data.substring( index, Math.min( index + BUFFER_SIZE, data.length ) ) + '")' );
				index += BUFFER_SIZE;
			}
			// console.log( { width: photo.width, height: photo.height } )
			setTimeout( () => {
				this.webview.injectJavaScript( 'run(' + photo.width + ', ' + photo.height + ')' );
			}, 5000 );
			// TODO: detect measurement
		}
	}

	_takePhoto = async () => {
		let photo = await this.camera.takePictureAsync( {
			base64: true,
			quality: 0,
		} );

		RNTesseractOcr.recognize( photo.uri, 'en', {} )
			.then( ( result ) => {
				this.setState( { ocrResult: result } );
				console.log( "OCR Result: ", result );
			} )
			.catch( ( err ) => {
				console.log( "OCR Error: ", err );
			} )
			.done();
		//

		return;
		// console.log( photo.base64.substring( 0, 20 ) );
		//"data:image/jpg;base64,' + photo.base64 + '",
		//' + photo.width + ', ' + photo.height + '
		//this.webview.injectJavaScript('run("data:image/jpg;base64,' + photo.base64.substring(0, 20) + '", ' + photo.width + ', ' + photo.height + ')');

		this.webview.injectJavaScript( 'resetImage()' );

		let data = "data:image/jpg;base64," + photo.base64;
		let index = 0;
		const BUFFER_SIZE = 10000;
		while ( index < data.length ) {
			console.log( 'Injecting' );
			this.webview.injectJavaScript( 'addImageData("' + data.substring( index, Math.min( index + BUFFER_SIZE, data.length ) ) + '")' );
			index += BUFFER_SIZE;
		}

		this.webview.injectJavaScript( 'run(' + photo.width + ', ' + photo.height + ')' );
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
						<WebView
							javaScriptEnabled={ true }
							ref={ ref => { this.webview = ref; } }
							source={ { html: HTML } }
							style={ { marginTop: 20, height: 30 } }
						/>
						<Camera ref={ ref => { this.camera = ref; } } style={ { flex: 1 } } type={ this.state.type }>
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
								<TouchableOpacity
									style={ {
										flex: 0.1,
										alignSelf: 'flex-end',
										alignItems: 'center',
									} }
									onPress={ () => this._takePhoto() }>
									<Text
										style={ { fontSize: 18, marginBottom: 10, color: 'white' } }>
										{ ' ' }Take{ ' ' }
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={ {
										flex: 0.1,
										alignSelf: 'flex-end',
										alignItems: 'center',
									} }
									onPress={ () => this.pickImage() }>
									<Text
										style={ { fontSize: 18, marginBottom: 10, color: 'white' } }>
										{ ' ' }Select from gallery{ ' ' }
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