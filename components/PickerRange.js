import React from 'react';
import { Picker } from 'react-native';

export default class PickerRange extends React.Component {
	render () {
		let { start, end, value, onValueChange } = this.props;
		let items = [];

		for ( let i = start; i <= end; i++) {
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

