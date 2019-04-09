import React from 'react';

import { StyleSheet, Text, View  } from 'react-native';

import { Toolbar, ActionButton } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

import PickerRange from './../components/PickerRange.js';

const initialMeasurements = {
	low: 80,
	high: 120,
	pulse: 60
};

export default class AddMeasurement extends React.Component {
	constructor( props ) {
		// Props are super
		super( props );

		this.state = {
			...initialMeasurements
		}
	}


	render() {
		return (
			<View style={{ paddingTop: Expo.Constants.statusBarHeight, flex: 1 }}>
			<Toolbar
				style={ styles.toolbar }
				leftElement="arrow-back"
				centerElement="Add Measurement"
				onRightElementPress={ (label) => { console.log(label) }}
				onLeftElementPress={ this.props.onBack }
				style={ {
					container: {
						backgroundColor: '#aa3333'
					}
				} }
				/>
				<View style={styles.container}>
					<Text>Low</Text>
					<PickerRange
						onValueChange={ ( value ) =>
							this.setState( { low: value } )
						}
						start={ 10 }
						end={ 200 }
						value={ this.state.low } />
					<Text>High</Text>
					<PickerRange
						onValueChange={ ( value ) =>
							this.setState( { high: value } )
						}
						start={ 10 }
						end={ 200 }
						value={ this.state.high } />
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
							console.log( this.state );
							const { low, high, pulse } = this.state;
							this.props.onConfirm({ low, high, pulse });
						} }
						style={{
							container: {
								backgroundColor:"#009688"
							}
						}}
						icon={ <Ionicons name="md-checkmark" size={32} color="white" /> }
						accessibilityLabel="Add a measurement" />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 16,
		paddingLeft: 16,
	},
	toolbar: {
		backgroundColor: '#aa3333',
		height: 56,
		alignSelf: 'stretch',
	}
});