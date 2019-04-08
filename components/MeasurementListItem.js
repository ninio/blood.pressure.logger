import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DateTime } from 'luxon';

export default class MeasurementListItem extends React.Component {
	render () {
		let { measurementData, date } = this.props.item;

		if( measurementData ) {
			return (
				<View style={{ flex: 1 }}>
					<Text style={{ color: '#09c' }}>
						{ DateTime.fromISO( date ).toLocaleString() }
					</Text>
					<Text>
						{ measurementData.low }
					</Text>
					<Text>
						{ measurementData.high }
					</Text>
					<Text>
						{ measurementData.pulse }
					</Text>
				</View>
			);
		}

		return null;
	}
}