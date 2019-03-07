import React from 'react';

import { StyleSheet, Text, View, ToolbarAndroid, Button, TextInput } from 'react-native';

import { ActionButton } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';

import PickerRange from './../components/PickerRange.js';

import MeasurementListItem from './../components/MeasurementListItem.js';

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
				<ToolbarAndroid
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
					{/* <Button onPress={ () => {
						const { low, high, pulse } = this.state;
						this.props.onConfirm({ low, high, pulse });
					} }
						title="Confirm"
						color="#841584"
						accessibilityLabel="Add a measurement" /> */}
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