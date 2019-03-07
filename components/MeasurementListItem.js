import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DateTime } from 'luxon';

export default class MeasurementListItem extends React.Component {
	render () {
		let { measurementData } = this.props;

		if( measurementData ) {
			return (
				<View style={{ flex: 1 }}>
					<Text style={{ color: '#09c' }}>
						{ DateTime.fromISO( this.props.date ).toLocaleString() }
					</Text>
					<Text>
						{ this.props.measurementData.low }
					</Text>
					<Text>
						{ this.props.measurementData.high }
					</Text>
					<Text>
						{ this.props.measurementData.pulse }
					</Text>
				</View>
			);
		}

		return null;
	}
}