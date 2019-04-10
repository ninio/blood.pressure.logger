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
					<View>
						<View style={ styles.measurementDate }>
							<Text style={ { color: '#09c', flex: 1 } }>
								{ DateTime.fromISO( date ).toLocaleString() }
							</Text>
						</View>
						<Text style={ { flex: 1 } }>
							{ measurementData.low }
						</Text>
						<Text style={ { flex: 1 } }>
							{ measurementData.high }
						</Text>
						<Text style={ { flex: 1 } }>
							{ measurementData.pulse }
						</Text>
					</View>
				</Card>
			);
		}

		return null;
	}
}

const styles = StyleSheet.create( {
	measurementDate: {
		color: '#09c',
		flex: 1
	},
	toolbar: {
		backgroundColor: '#aa3333',
		height: 56,
		alignSelf: 'stretch',
	}
} );