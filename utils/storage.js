import { AsyncStorage } from 'react-native';

export _storeData = async ( key, value ) => {
	try {
		await AsyncStorage.setItem( key, value );
	} catch ( error ) {
		// Error saving
	}
}

export _retrieveData = async ( key ) => {
	return AsyncStorage.getItem( key );
	// try {
	// 	const value = await AsyncStorage.getItem( key );
	// 	if ( value !== null ) {
	// 		// We have data!!
	// 		console.log( value );
	// 	}
	// }
	// catch ( error ) {
	// 	// Error reading
	// }
}
