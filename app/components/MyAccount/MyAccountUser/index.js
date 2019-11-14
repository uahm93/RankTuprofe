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
			<View style={styles.userAccountView}>
				<InfoUser />
				<View style={styles.viewBody}>
					<Button
						buttonStyle={styles.boton}
						titleStyle={styles.titulo}
						title="Cerrar sesión"
						onPress={() => this.logout()}
					/>
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
	userAccountView: {
		height: '100%',
		backgroundColor: '#f2f2f2'
	},
	boton: {
		marginTop: 30,
		borderRadius: 0,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#e3e3e3',
		borderBottomWidth: 1,
		borderBottomColor: '#e3e3e3',
		paddingTop: 10,
		paddingBottom: 10
	},
	titulo: { color: '#BB0000' },
	title: {
		fontWeight: 'bold',
		fontSize: 19,
		marginBottom: 10
	},

	btnStyle: {
		backgroundColor: '#BB0000',
		width: '100%'
	}
});
