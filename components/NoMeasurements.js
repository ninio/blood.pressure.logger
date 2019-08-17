import React from 'react';
import { Text, View } from 'react-native';

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const translations = {
	'bg-BG': {
		noMeasurementsText: `Все още нямате измервания.`,
		initialInstructionText: `Измерете си кръвното налягане и натиснете '+' за да го запишете.`
	},
	'en-US': {
		noMeasurementsText: `You don't have any measurements yet.`,
		initialInstructionText: `Measure your blood pressure and press '+' to add it.`
	},
	'en-UK': {
		noMeasurementsText: `You don't have any measurements yet.`,
		initialInstructionText: `Measure your blood pressure and press '+' to add it.`
	}
}

i18n.fallbacks = true;
i18n.translations = translations;
i18n.locale = Localization.locale;


export default ( { style } ) => (
	<View style={ style }>
		<Text>{ i18n.t( 'noMeasurementsText' ) }</Text>
		<Text>{ i18n.t( 'initialInstructionText' ) }</Text>
	</View>
);