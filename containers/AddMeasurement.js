import React from 'react';

import { StyleSheet, Text, View, ToolbarAndroid, Button, TextInput } from 'react-native';


import MeasurementListItem from './../components/MeasurementListItem.js';

export default class AddMeasurement extends React.Component {
	constructor( props ) {
		// Props are super
		super( props );
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
					<TextInput
						style={{height: 40}}
						placeholder="Low"
						onChangeText={(low) => this.setState({low})}
						/>
					<TextInput
						style={{height: 40}}
						placeholder="High"
						onChangeText={(high) => this.setState({high})}
						/>
					<TextInput
						style={{height: 40}}
						placeholder="Pulse"
						onChangeText={(pulse) => this.setState({pulse})}
						/>
				</View>
				<View>
					<Button onPress={ () => {
						const { low, high, pulse } = this.state;
						this.props.onConfirm({ low, high, pulse });
					} }
						title="Confirm"
						color="#841584"
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