import React from 'react';

import { StyleSheet, Text, View, ScrollView, ToolbarAndroid, Button } from 'react-native';


import MeasurementListItem from './../components/MeasurementListItem.js';

export default class Home extends React.Component {
	render() {
		let { measurements } = this.props;
		let measurementsList = [];

		if( measurements ) {
			measurementsList = this.props.measurements.map( measurement =>
					( <MeasurementListItem key={ measurement.date } { ...measurement } /> )
			);
		}
		else {
			console.log( 'Problemos' );
		}


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
				<ScrollView style={styles.container}>
					{ measurementsList }
				</ScrollView>
				<View>
					<Button onPress={ this.props.onPressAddMeasurement }
						title="Add"
						color="#841584"
						accessibilityLabel="Add a measurement" />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		flex: 1,
		flexDirection: 'row',
		// backgroundColor: '#aff',
		paddingTop: 16,
		paddingLeft: 16,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	toolbar: {
		backgroundColor: '#aa3333',
		height: 56,
		alignSelf: 'stretch',
		// titleColor: '#fff',
		// textAlign: 'center',
	}
});
