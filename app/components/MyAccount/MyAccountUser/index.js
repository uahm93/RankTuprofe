import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Button, Image } from 'react-native-elements';
import * as firebase from 'firebase';
import InfoUser from './infoUser';

export default class MyAccountOwn extends Component {
	constructor(props) {
		super(props);
	}
	logout = () => {
		firebase.auth().signOut().then();
	};
	render() {
		const { goToScreen } = this.props;
		return (
			<View>
				<InfoUser />
				<View style={styles.viewBody}>
					<Button title="Cerrar sesión" onPress={() => this.logout()} />
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	image: {
		height: 300,
		marginBottom: 40
	},
	title: {
		fontWeight: 'bold',
		fontSize: 19,
		marginBottom: 10
	},

	btnStyle: {
		backgroundColor: '#00a680',
		width: '100%'
	}
});
