import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import t from 'tcomb-form-native';
import * as firebase from 'firebase';
import Toast, { DURATION } from 'react-native-easy-toast';

const Form = t.form.Form;

import { RegisterStruct, RegisterOptions } from '../../forms/Register';
import { Button, Text, Image } from 'react-native-elements';

export default class MyAccount extends Component {
	constructor() {
		super();
		this.state = {
			registerStruct: RegisterStruct,
			registerOptions: RegisterOptions,
			formData: {
				name: '',
				email: '',
				password: '',
				passswordConfirmation: ''
			},
			formErrorMessage: ''
		};
	}
	register = () => {
		const { password, passswordConfirmation } = this.state.formData;

		if (password == passswordConfirmation) {
			const validate = this.refs.registerForm.getValue();
			if (validate) {
				this.setState({ formErrorMessage: '' });
				//console.log("Todo chidio");
				firebase
					.auth()
					.createUserWithEmailAndPassword(validate.email, validate.password)
					.then((result) => {
						this.refs.toast.show('Rgistro correcto', 200, () => {
							this.props.navigation.navigate('Myaccount');
						});
					})
					.catch((err) => {
						this.refs.toast.show('El correo ya esta en uso', 2500);
					});
			} else {
				this.setState({
					formErrorMessage: 'Formulario invalido'
				});
			}
		} else {
			this.setState({
				formErrorMessage: 'Las contraseñas  no coinciden'
			});
		}
	};

	onChangeFormRegister = (formValue) => {
		this.setState({
			formData: formValue
		});
	};

	render() {
		const { registerStruct, registerOptions, formErrorMessage } = this.state;
		return (
			<View style={styles.viewBody}>
				<Image
					source={require('../../../assets/img/logo4.png')}
					style={styles.logo}
					containerStyle={styles.contaimerLogo}
					resizeMode="contain"
				/>
				<Form
					ref="registerForm"
					type={registerStruct}
					options={registerOptions}
					value={this.state.formData}
					onChange={(formValue) => this.onChangeFormRegister(formValue)}
				/>
				<Button
					buttonStyle={styles.buttonRegisterContainer}
					title="Registrarse"
					onPress={() => this.register()}
				/>
				<Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
				<Toast
					ref="toast"
					position="bottom"
					positionValue={250}
					fadeInDuration={1000}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: 'white' }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1,
		justifyContent: 'center',
		marginLeft: 40,
		marginRight: 40
	},
	buttonRegisterContainer: {
		backgroundColor: '#00a680',
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10
	},
	formErrorMessage: {
		color: '#f00',
		textAlign: 'center',
		marginTop: 30
	},
	contaimerLogo: {
		alignItems: 'center',
		marginBottom: 30
	},
	logo: {
		width: 300,
		height: 100
	}
});
