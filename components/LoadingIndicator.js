import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default () => (
	<View style={ styles.loadingContainer }>
		<Text style={ styles.loadingText }>
			Loading...
		</Text>
	</View>
);

const styles = StyleSheet.create( {
	loadingContainer: {
		height: '100%',
		flex: 1,
		flexDirection: 'row'
	},
	loadingText: {
		textAlign: 'center'
	}
} );
