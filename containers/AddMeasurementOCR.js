import React from 'react';

import { TouchableOpacity, WebView, StyleSheet, Button, Text, View } from 'react-native';

import { Camera, Permissions } from 'expo';
// import { ImagePicker } from 'expo';

import { ActionButton } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

import storage from './../middleware/localStorage.js';


const HTML = `
<div id="thediv">yooo</div>
<div id="imagediv">image here</div>

<script src='https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/tesseract.js'></script>
<script>
var base64 = "";
var output = "";
function resetImage() {
  base64 = "";
}
function addImageData(data) {
  base64 = base64 + data;
}
function writeResult(text) {
  output = output + '<br/>' + text;
  document.getElementById('thediv').innerHTML = output;
}

function run(width, height) {
  width = 500;
  height = 500;
  document.getElementById('imagediv').innerHTML = "<img id='theimage' src='" + base64 + "' width=" + width + " height=" + height + "/>";

  setTimeout(function () {
    var theimage = document.getElementById('theimage');
    writeResult('loading: ' + theimage);
    Tesseract.recognize(theimage)
         .progress(function  (p) { writeResult('progress ' + JSON.stringify(p))    })
         .catch(function (e) {  writeResult('error ' + JSON.stringify(e)) })
         .then(function (result) { writeResult('result ' + JSON.stringify(result)) });
  }, 500);
}
</script>
`;

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

	_takePhoto = async () => {
		let photo = await this.camera.takePictureAsync( {
			base64: true,
			quality: 0,
		} );
		//console.log(photo.base64.substring(0, 20));
		//"data:image/jpg;base64,' + photo.base64 + '",
		//' + photo.width + ', ' + photo.height + '
		//this.webview.injectJavaScript('run("data:image/jpg;base64,' + photo.base64.substring(0, 20) + '", ' + photo.width + ', ' + photo.height + ')');

		this.webview.injectJavaScript( 'resetImage()' );

		let data = "data:image/jpg;base64," + photo.base64;
		let index = 0;
		const BUFFER_SIZE = 10000;
		while ( index < data.length ) {
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