import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Overlay, Input, Button, Icon } from 'react-native-elements';

export default class OverLayThreeInput extends Component {
	constructor(props) {
		super(props);
		this.state = { ...props };
	}
	onChangeInputOne = (inputData) => {
		this.setState({
			inputValueOne: inputData
		});
	};
	onChangeInputTwo = (inputData) => {
		this.setState({
			inputValueTwo: inputData
		});
	};
	onChangeInputThree = (inputData) => {
		this.setState({
			inputValueThree: inputData
		});
	};
	update = () => {
		const newValueOne = this.state.inputValueOne;
		const newValueTwo = this.state.inputValueTwo;
		const newValueThree = this.state.inputValueThree;

		this.state.updateFunction(newValueOne, newValueTwo, newValueThree);

		this.setState({
			isVisibleOverlay: false
		});
	};

	close = () => {
		this.setState({ isVisibleOverlay: false });
		this.state.updateFunction(null);
	};
	render() {
		const {
			isVisibleOverlay,
			placeholderOne,
			placeholderTwo,
			placeholderThree,
			inputValueOne,
			inputValueTwo,
			inputValueThree,
			isPassword
		} = this.state;
		return (
			<Overlay
				fullScreen={true}
				isVisible={isVisibleOverlay}
				overlayBackgroundColor="transparent"
				overlayStyle={styles.overlayStyle}
			>
				<View style={styles.viewOverlay}>
					<Input
						containerStyle={styles.inputContainer}
						onChangeText={(value) => this.onChangeInputOne(value)}
						value={inputValueOne}
						placeholder={placeholderOne}
						password={isPassword}
						secureTextEntry={true}
					/>
					<Input
						containerStyle={styles.inputContainer}
						onChangeText={(value) => this.onChangeInputTwo(value)}
						value={inputValueTwo}
						placeholder={placeholderTwo}
						password={isPassword}
						secureTextEntry={true}
					/>
					<Input
						containerStyle={styles.inputContainer}
						onChangeText={(value) => this.onChangeInputThree(value)}
						value={inputValueThree}
						placeholder={placeholderThree}
						password={isPassword}
						secureTextEntry={true}
					/>
					<Button buttonStyle={styles.buttonUpdate} title="Actualizar" onPress={() => this.update()} />
					<Icon
						containerStyle={styles.containerIconClose}
						type="material-community"
						name="close-circle-outline"
						size={30}
						onPress={() => this.close()}
					/>
				</View>
			</Overlay>
		);
	}
}

const styles = StyleSheet.create({
	overlayStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	viewOverlay: {
		width: '100%',
		backgroundColor: '#fff',
		padding: 20
	},
	inputContainer: {
		marginBottom: 20
	},
	buttonUpdate: {
		backgroundColor: '#00A680'
	},
	containerIconClose: {
		position: 'absolute',
		right: -15,
		top: -15
	}
});
