import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import OverLayOneInput from '../../Elements/OverlayOneImput';
import OverLayTwoInput from '../../Elements/OverlayTwoImput';
import OverLayThreeInput from '../../Elements/OverlayThree';
import Toast, { DURATION } from 'react-native-easy-toast';

export default class UpdateUserInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...props,
			overlayComponent: null,
			menuItems: [
				{
					title: 'Cambiar nombre y apellidos',
					iconType: 'material-community',
					iconNameRight: 'chevron-right',
					iconNameLeft: 'account-circle',
					iconColorLeft: '#ccc',
					iconColorRight: '#ccc',
					onPress: () =>
						this.openOverlay('Nombre y Apellido', this.updateUserDisplayName, props.userInfo.displayName)
				},
				{
					title: 'Cambiar email',
					iconType: 'material-community',
					iconNameRight: 'chevron-right',
					iconNameLeft: 'at',
					iconColorLeft: '#ccc',
					iconColorRight: '#ccc',
					onPress: () =>
						this.openOverlayTwoInput('Email', 'Password', props.userInfo.email, this.updateUserEmail)
				},
				{
					title: 'Cambiar contraseña',
					iconType: 'material-community',
					iconNameRight: 'chevron-right',
					iconNameLeft: 'lock-reset',
					iconColorLeft: '#ccc',
					iconColorRight: '#ccc',
					onPress: () =>
						this.openOverlayThreeInputs(
							'Tu contraseña',
							'Nueva contraseña',
							'Repetir nueva contraseña',
							this.updateUserPassword
						)
				}
			]
		};
	}
	updateUserDisplayName = async (newDisplayName) => {
		if (newDisplayName) {
			this.state.updateUserDisplayName(newDisplayName);
		}
		this.setState({ overlayComponent: null });
	};
	openOverlay = (placeholder, updateFunction, inputValue) => {
		this.setState({
			overlayComponent: (
				<OverLayOneInput
					isVisibleOverlay={true}
					placeholder={placeholder}
					updateFunction={updateFunction}
					inputValue={inputValue}
				/>
			)
		});
	};

	updateUserEmail = async (newEmail, password) => {
		const emailOld = this.props.userInfo.email;
		if (emailOld != newEmail && password) {
			this.state.updateUserEmail(newEmail, password);
		}
		this.setState({ overlayComponent: null });
	};

	openOverlayTwoInput = (placeholderOne, placeholderTwo, inputValueOne, updateFunction) => {
		this.setState({
			overlayComponent: (
				<OverLayTwoInput
					isVisibleOverlay={true}
					placeholderOne={placeholderOne}
					placeholderTwo={placeholderTwo}
					updateFunction={updateFunction}
					inputValueOne={inputValueOne}
					inputValueTwo=""
					isPassword={true}
					updateFunction={updateFunction}
				/>
			)
		});
	};

	updateUserPassword = async (currentPassword, newPassword, repeatNewPassword) => {
		if (currentPassword && newPassword && repeatNewPassword) {
			if (newPassword === repeatNewPassword) {
				if (currentPassword === newPassword) {
					this.refs.toast.show('La nueva contraseña no debe ser igual a la actual', 1500);
				} else {
					this.state.updateUserPassword(currentPassword, newPassword);
				}
			} else {
				this.refs.toast.show('La nuevas contraseñas tienen que ser iguales', 1500);
			}
		} else {
			this.refs.toast.show('Tienes que ingresar todos los campos', 1500);
		}
		this.setState({
			overlayComponent: null
		});
	};
	openOverlayThreeInputs = (placeholderOne, placeholderTwo, placeholderThree, updateFunction) => {
		this.setState({
			overlayComponent: (
				<OverLayThreeInput
					isVisibleOverlay={true}
					placeholderOne={placeholderOne}
					placeholderTwo={placeholderTwo}
					placeholderThree={placeholderThree}
					inputValueOne=""
					inputValueTwo=""
					inputValueThree=""
					isPassword={true}
					updateFunction={updateFunction}
				/>
			)
		});
	};

	render() {
		const { menuItems, overlayComponent } = this.state;
		return (
			<View>
				{menuItems.map((item, index) => (
					<ListItem
						key={index}
						title={item.title}
						leftIcon={{
							type: item.iconType,
							name: item.iconNameLeft,
							color: item.iconColorLeft
						}}
						rightIcon={{
							type: item.iconType,
							name: item.iconNameRight,
							color: item.iconColoRight
						}}
						onPress={item.onPress}
						containerStyle={StyleSheet.contentContainerStyle}
					/>
				))}
				{overlayComponent}
				<Toast
					ref="toast"
					position="center"
					fadeOutDuration={1000}
					opacity={0.8}
					positionValue={0}
					fadeInDuration={1000}
					fadeOutDuration={1000}
					textStyle={{ color: '#fff' }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	contentContainerStyle: {
		borderBottomWidth: 1,
		borderBottomColor: '#E3E3E3'
	}
});
