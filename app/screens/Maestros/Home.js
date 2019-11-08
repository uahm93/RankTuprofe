import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { white } from 'ansi-colors';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			login: false
		};
	}
	componentDidMount() {
		this.checkLogin();
	}
	checkLogin = () => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					login: true
				});
			} else {
				this.setState({
					login: false
				});
			}
		});
	};
	goToScreen = (nameScreen) => {
		this.props.navigation.navigate(nameScreen);
	};
	render() {
		const { login } = this.state;
		return (
			<View style={styles.viewBody}>
				<Text>Pantalla principal</Text>
				{login ? (
					<ActionButton
						buttonColor="#00a68a"
						onPress={() => {
							this.goToScreen('AddNuevo');
						}}
					/>
				) : null}
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
