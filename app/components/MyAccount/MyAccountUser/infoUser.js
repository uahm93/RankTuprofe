import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import UpdateUserInfo from './UpdateUserInfo';
import Toast, { DURATION } from 'react-native-easy-toast';

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

	reautenticate = (currentPassword) => {
		const user = firebase.auth().currentUser;
		const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
		return user.reauthenticateWithCredential(credentials);
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
	updateUserEmail = async (newEmail, password) => {
		this.reautenticate(password)
			.then(() => {
				const user = firebase.auth().currentUser;
				user
					.updateEmail(newEmail)
					.then(() => {
						this.refs.toast.show('Cambio de contraseña correcto', 1500);
						firebase.auth().signOut();
					})
					.catch((err) => {
						console.log(error);
					});
			})
			.catch((err) => {
				this.refs.toast.show('Tu contraseña es incorrecta', 1500);
			});
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
				<Toast
					ref="toast"
					position="bottom"
					fadeOutDuration={1000}
					opacity={0.8}
					positionValue={250}
					fadeInDuration={1000}
					textStyle={{ color: '#fff' }}
				/>
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
