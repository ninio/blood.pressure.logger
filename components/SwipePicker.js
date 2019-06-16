import React, { useState, useRef } from 'react';

import { FlatList, Text, StyleSheet, View } from 'react-native'

import { LinearGradient } from 'expo';

const itemHeight = 40;
const listHeight = 200;

/**
 *
 * @param {Object} props
 *
 * @param {Array} props.items
 * @param {Function} props.onChange
 * @param {Number} [props.initialSelectedItem]
 */
export default ( { items, onChange, initialSelectedItem = null } ) => {
	const [ selectedItem, setSelectedItem ] = useState( initialSelectedItem );

	const flatList = useRef( null );

	let extendedItems = [
		{
			value: -11,
			label: ''
		},
		{
			value: -12,
			label: ''
		},
		...items,
		{
			value: -21,
			label: ''
		},
		{
			value: -22,
			label: ''
		} ];

	return (
		<View style={ styles.list } >
			<FlatList
				ref={ flatList }
				data={ extendedItems.map( item => ( {
					key: item.value.toString(),
					...item
				} ) ) }
				renderItem={ item => ( <View style={ styles.listItem }><Text>{ item.item.label }</Text></View> ) }
				snapToInterval={ itemHeight }
				ListEmptyComponent={ () => <Text>No Items</Text> }
			/>
			<LinearGradient
				colors={ [
					'rgba( 255, 255, 255, 1 )',
					'rgba( 255, 255, 255, 0.9 )',
					'rgba( 255, 255, 255, 0.7 )',
					'rgba( 255, 255, 255, 0.5 )'
				] }
				style={ [ styles.pickerGradient, styles.topGradient ] }
				pointerEvents="none"
			/>
			<LinearGradient
				colors={ [
					'rgba( 255, 255, 255, 0.5 )',
					'rgba( 255, 255, 255, 0.7 )',
					'rgba( 255, 255, 255, 0.9 )',
					'rgba( 255, 255, 255, 1 )',
				] }
				style={ [ styles.pickerGradient, styles.bottomGradient ] }
				pointerEvents="none"
			/>
		</View>
	)
}

const styles = StyleSheet.create( {
	list: {
		height: listHeight,
		borderColor: '#09c',
	},
	listItem: {
		height: itemHeight,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#0c9'
	},
	pickerGradient: {
		position: 'absolute',
		height: 80,
		width: '100%'
	},
	topGradient: {
		top: 0,
	},
	bottomGradient: {
		bottom: 0
	}
} );
