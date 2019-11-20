import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Button, Image } from 'react-native-elements';

export default class MyAccountGuest extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { goToScreen } = this.props;
		return (
			<View style={styles.viewBody}>
				<Image
					style={styles.image}
					source={require('../../../assets/img/logo4.png')}
					PlaceholderContent={<ActivityIndicator />}
					resizeMode="contain"
				/>
				<Text style={styles.title}>Inicia sesión para evaluar a tus docentes </Text>
				<Text>¡Ahora te toca a ti evaluarlos!</Text>
				<Button buttonStyle={styles.btnStyle} title="Ver tu petfil" onPress={() => goToScreen('Login')} />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	viewBody: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 30,
		paddingRight: 30
	},
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
		backgroundColor: '#BB0000',
		width: '100%'
	}
});
