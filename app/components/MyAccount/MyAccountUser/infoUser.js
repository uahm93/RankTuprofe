import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import UpdateUserInfo from './UpdateUserInfo';
import Toast, { DURATION } from 'react-native-easy-toast';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

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

	getUserInfo = () => {
		const user = firebase.auth().currentUser;

		user.providerData.forEach((userInfo) => {
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
	updateUserPassword = async (currentPassword, newPassword) => {
		this.reautenticate(currentPassword)
			.then(() => {
				const user = firebase.auth().currentUser;

				user
					.updatePassword(newPassword)
					.then(() => {
						this.refs.toast.show('Contraseña cambiada correctamete, vuelve a iniciar sesión', 50, () => {
							firebase.auth().signOut();
						});
					})
					.catch(() => this.refs.toast.show('Error intente mas tarde', 1500));
			})
			.catch(() => this.refs.toast.show('Tu contraseña es incorrecta', 1500));
	};
	updateUserPhotoURL = async (photoUri) => {
		const update = { photoURL: photoUri };

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
					updateUserPassword={this.updateUserPassword}
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
						this.refs.toast.show('Cambio de contraseña correcto, favor de iniciar sesión', 1500, () => {
							firebase.auth().signOut();
						});
					})
					.catch((err) => {
						this.refs.toast.show(error, 1500);
					});
			})
			.catch((err) => {
				this.refs.toast.show('Tu contraseña es incorrecta', 1500);
			});
	};
	changeAvatarUser = async () => {
		const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (resultPermission.status === 'denied') {
			this.refs.toast.show('Es necesario aceptar los permisos para realizar esta accion', 1500);
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [ 4, 3 ] });
			if (result.cancelled) {
				this.refs.toast.show('Operacion cancelada', 1500);
			} else {
				const { uid } = this.state.userInfo;
				this.upLoadImage(result.uri, uid)
					.then((resolve) => {
						this.refs.toast.show('Avatar actualizado correctamente', 1500);

						firebase
							.storage()
							.ref('avatar/' + uid)
							.getDownloadURL()
							.then((resolve) => {
								this.updateUserPhotoURL(resolve);
								//console.log(resolve);
							})
							.catch((error) => {
								this.refs.toast.show('Error al recuperar el avatar del servidor', 1500);
							});
					})
					.catch((error) => {
						this.refs.toast.show('Error al actualizar el avatar, intentar mas tarde', 1500);
					});
			}
		}
	};
	upLoadImage = async (uri, nameImage) => {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.onerror = reject;
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					resolve(xhr.response);
				}
			};
			xhr.open('GET', uri);
			xhr.responseType = 'blob';
			xhr.send();
		})
			.then(async (resolve) => {
				let ref = firebase.storage().ref().child('avatar/' + nameImage);
				return await ref.put(resolve);
			})
			.catch((error) => {
				this.refs.toast.show('Error al subir imagen intente mas tarde', 1500);
			});
	};
	render() {
		const { displayName, email, photoURL } = this.state.userInfo;
		return (
			<View>
				<View style={styles.viewUserInfo}>
					<Avatar
						rounded
						size="large"
						source={{
							uri: this.checkUserAvatar(photoURL)
						}}
						containerStyle={styles.userInfoAvatar}
						showEditButton
						onEditPress={() => this.changeAvatarUser()}
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
