import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import UpdateUserInfo from './UpdateUserInfo';

export default class infoUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props,
			userInfo: {}
		};
	}
	componentDidMount = () => {
		this.getUserInfo();
	};
	getUserInfo = async () => {
		const user = firebase.auth().currentUser;

		await user.providerData.forEach((userInfo) => {
			this.setState({
				userInfo
			});
		});
	};
	checkUserAvatar = (photoUrl) => {
		return photoUrl ? photoUrl : 'https://api.adorable.io/avatars/282/abott@adorable.pngCopy';
	};

	updateUserDisplayName = async (newDisplayName) => {
		const update = { displayName: newDisplayName };

		await firebase.auth().currentUser.updateProfile(update);

		this.getUserInfo();
	};

	returnUpdateUserInfoComponent = (userInfoData) => {
		if (userInfoData.hasOwnProperty('uid')) {
			return (
				<UpdateUserInfo
					userInfo={this.state.userInfo}
					updateUserDisplayName={this.updateUserDisplayName}
					updateUserEmail={this.updateUserEmail}
				/>
			);
		}
	};

	returnUpdateUserEmail = async (newEmail, password) => {
		console.log('nuevo correoo' + newEmail);
		console.log('Nuevo password' + password);
	};
	render() {
		const { displayName, email, photoUrl } = this.state.userInfo;
		return (
			<View>
				<View style={styles.viewUserInfo}>
					<Avatar
						rounded
						size="large"
						source={{
							uri: this.checkUserAvatar(photoUrl)
						}}
						containerStyle={styles.userInfoAvatar}
					/>
					<View>
						<Text style={styles.displayName}>{displayName}</Text>
						<Text>{email}</Text>
					</View>
				</View>
				{this.returnUpdateUserInfoComponent(this.state.userInfo)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewUserInfo: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 30,
		paddingBottom: 30,
		backgroundColor: '#f2f2f2'
	},
	userInfoAvatar: {
		marginRight: 20
	},
	displayName: {
		fontWeight: 'bold'
	}
});
