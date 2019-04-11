import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from 'react-native-material-ui';

import { DateTime } from 'luxon';

export default class MeasurementListItem extends React.Component {
	render () {
		let { measurementData, date } = this.props.item;

		if ( measurementData ) {
			return (
				<Card>
					<View style={ styles.measurementDetails }>
						<View style={ styles.measurementData }>
							<View style={ styles.measurementLow }>
								<Text>low </Text>
								<Text style={ styles.measurementLowText }>
									{ measurementData.low }
								</Text>
							</View>
							<View style={ styles.measurementHigh }>
								<Text>high </Text>
								<Text style={ styles.measurementHighText }>
									{ measurementData.high }
								</Text>
							</View>
							<View style={ styles.measurementPulse }>
								<Text>
									pulse
								</Text>
								<Text style={ styles.measurementPulseText }>
									{ measurementData.pulse }
								</Text>
							</View>
						</View>
						<View style={ styles.measurementDate }>
							<Text style={ styles.measurementDateText }>
								{ DateTime.fromISO( date ).toLocaleString() }
							</Text>
						</View>
					</View>
				</Card>
			);
		}

		return null;
	}
}

const styles = StyleSheet.create( {
	measurementDetails: {
		flexDirection: 'row'
	},
	measurementDate: {
		flex: 1,
		paddingRight: 12,
		paddingBottom: 12
	},
	measurementData: {
		flex: 5,
		flexDirection: 'row'
	},
	measurementDateText: {
		color: '#999',
		textAlign: 'right'
	},
	measurementLow: {
		height: 64,
		flex: 1,
		paddingLeft: 12
	},
	measurementHigh: {
		height: 64,
		flex: 1
	},
	measurementPulse: {
		height: 64,
		flex: 1
	},
	measurementLowText: {
		textAlign: 'center',
		fontSize: 24
	},
	measurementHighText: {
		textAlign: 'center',
		fontSize: 32
	},
	measurementPulseText: {
		textAlign: 'center',
		fontSize: 24,
	},
	toolbar: {
		backgroundColor: '#aa3333',
		height: 56,
		alignSelf: 'stretch',
	}
} );