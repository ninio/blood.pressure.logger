import React from 'react';
import { Text, View } from 'react-native';

import i18n from 'i18n-js';

export default ( { style, headingStyle, subtextStyle } ) => (
	<View style={ style }>
		<Text style={ headingStyle }>{ i18n.t( 'noMeasurementsText' ) }</Text>
		<Text style={ subtextStyle }>{ i18n.t( 'initialInstructionText' ) }</Text>
	</View>
);
