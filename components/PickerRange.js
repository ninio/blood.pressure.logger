import React from 'react';

import SwipePicker from 'react-native-swipe-picker';

export default ( { start, end, initialValue, onValueChange, width, height } ) => {
	let items = [];

	for ( let i = start; i <= end; i++ ) {
		items.push(
			{ value: i, label: i.toString() }
		);
	}

	return (
		<SwipePicker
			items={ items }
			onChange={ ( { index, item } ) => {
				onValueChange( index + start )
			} }
			initialSelectedIndex={ initialValue - start }
			width={ width }
			height={ height }
		/>
	)
}
