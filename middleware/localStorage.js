import { AsyncStorage } from 'react-native';

export default storage = {
	setItem: async ( key, data ) => {
		try {
			await AsyncStorage.setItem( key, JSON.stringify( data ) );
		}
		catch( error ) {
			// Problemos
			return 'Problemos saving';
		}
	},
	getItem: async ( key ) => {
		try {
			let rawData = await AsyncStorage.getItem( key );

			if( rawData !== null ) {
				return JSON.parse( rawData );
			}

			else {
				return null;
				console.log( 'Raw Data is not JSON' );
			}
		}
		catch( error ) {
			// Problemos
			return null;
		}
	}
}