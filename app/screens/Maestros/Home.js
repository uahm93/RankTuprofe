import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { white } from 'ansi-colors';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseApp } from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);
export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			login: false,
			docente: null,
			startDocente: null,
			limitDocente: 8
		};
	}
	componentDidMount() {
		this.checkLogin();
		this.loadDocentes();
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
	loadDocentes = async () => {
		const limitDocente = this.state;
		let resultDocente = [];

		const docentes = db.collection('Docentes').orderBy('createat', 'desc').limt(limitDocente);

		await docentes.get().then((response) => {
			this.setState({
				startDocente: response.docs[response.docs.length - 1]
			});
			// response.forEach((element) => {
			// 	console.log(element);
			// });
			console.log(response);
		});
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
