import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default ( { measurements } ) => {
	return (
		<View style={ styles.chartContainer }>
			<Text>Chart Here</Text>
		</View>
	);
}


const styles = StyleSheet.create( {
	chartContainer: {
		backgroundColor: '#fff',
		flex: 1
	}
} );