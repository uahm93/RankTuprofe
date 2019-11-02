import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { white } from 'ansi-colors';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Home extends Component {
	render() {
		return (
			<View style={styles.viewBody}>
				<Text>Pantalla principal</Text>
				<ActionButton
					buttonColor="#00a68a"
					onPress={() => {
						console.log('Open app restaurante');
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		alignContent: 'center'
	}
});
