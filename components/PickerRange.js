import React from 'react';

import { Picker } from 'react-native';

import SwipePicker from './SwipePicker.js';

export default ( { start, end, value, onValueChange } ) => {
	let items = [];

	for ( let i = start; i <= end; i++ ) {
		items.push(
			{ value: i, label: i.toString() }
		);
	}

	return (
		<SwipePicker
			items={ items }
			onChange={ ( index, value ) => onValueChange( value ) }
			initialSelectedItem={ value }
		/>
	)
}

export class PickerRange extends React.Component {
	render () {
		let { start, end, value, onValueChange } = this.props;
		let items = [];

		for ( let i = start; i <= end; i++ ) {
			items.push(
				<Picker.Item key={ i } label={ i.toString() } value={ i } />
			);
		}

		return (
			<Picker
				onValueChange={ onValueChange }
				selectedValue={ value } >
				{ items }
			</Picker>
		);
	}
}
