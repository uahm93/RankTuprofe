import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Toast, { DURATION } from 'react-native-easy-toast';
import t from 'tcomb-form-native';

const Form = t.form.Form;

import { AddNuevoStruct, addNuevoOptions } from '../../forms/AddNuevo';

export default class AddNuevo extends Component {
	constructor() {
		super();
		this.state = {
			imageUri: '',
			formData: {
				name: '',
				city: '',
				school: '',
				description: ''
			}
		};
	}

	isImage = (image) => {
		if (image) {
			return <Image source={{ uri: image }} style={{ width: 500, height: 200 }} source={{ uri: imageUri }} />;
		} else {
			return <Image source={require('../../../assets/img/no-image.png')} style={{ width: 200, height: 200 }} />;
		}
	};
	uploadImage = async () => {
		const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (resultPermission.status === 'denied') {
			this.refs.toast.show('Es necesario aceptar los permisos de la galeria', 1500);
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });

			if (result.cancelled) {
				this.refs.toast.show('Se candeló la operación', 1500);
			} else {
				this.setState({
					imageUri: result.uri
				});
			}
		}
	};
	render() {
		const { imageUri } = this.state;
		return (
			<View style={styles.viewBody}>
				<View style={styles.viewPhoto}>{this.isImage(imageUri)}</View>
				<View>
					<Form
						ref="AddNuevoForm"
						type={AddNuevoStruct}
						options={addNuevoOptions}
						value={this.state.formData}
					/>
				</View>
				<View style={styles.uploadPhoto}>
					<Icon
						name="camera"
						type="material-community"
						color="#7A7A7A"
						onPress={() => this.uploadImage()}
						iconStyle={styles.iconStyle}
					/>
				</View>
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
	viewBody: {
		flex: 1
	},
	viewPhoto: {
		alignItems: 'center',
		height: 150,
		marginBottom: 20
	},
	uploadPhoto: {
		flex: 1,
		alignItems: 'flex-start',
		marginLeft: 12
	},
	iconStyle: {
		backgroundColor: '#E3E3E3',
		padding: 12,
		paddingBottom: 12,
		margin: 0
	}
});
