import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Image, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Toast, { DURATION } from 'react-native-easy-toast';
import t from 'tcomb-form-native';
import { uploadImage } from '../../utils/UploadImage';

const Form = t.form.Form;

import { AddNuevoStruct, addNuevoOptions } from '../../forms/AddNuevo';

import { firebaseApp } from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

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
			return <Image source={{ uri: image }} style={{ width: 300, height: 140 }} />;
		} else {
			return <Image source={require('../../../assets/img/no-image.png')} style={{ width: 150, height: 150 }} />;
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
	onChangeFormAddNuevo = (formValue) => {
		this.setState({
			formData: formValue
		});
	};
	addDocente = () => {
		const { imageUri } = this.state;
		const { name, city, school, addDocente, description } = this.state.formData;

		if (imageUri && name && school && city && description) {
			const data = {
				name,
				city,
				school,
				description,
				image: ''
			};
			db
				.collection('Docentes')
				.add({ data })
				.then((resolve) => {
					const docenteId = resolve.id;

					uploadImage(imageUri, docenteId, 'FotosDocentes')
						.then((resolve) => {
							const docenteRef = db.collection('FotosDocentes').doc(docenteId);
							docenteRef
								.update({ image: resolve })
								.then(() => {
									this.refs.toast.show('Docente creado correctamente', 1500);
								})
								.catch((err) => {
									this.refs.toast.show('Error de servidor intente mas tarde', 1500);
								});
						})
						.catch((err) => {
							this.refs.toast.show('Error de servidor intente mas tarde', 1500);
						});
				})
				.then(() => {
					this.refs.toast.show('Error de servidor intente mas tarde', 1500);
				});
		} else {
			this.refs.toast.show('Tienes que llenar todos los campos', 1500);
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
						onChange={(formValue) => this.onChangeFormAddNuevo(formValue)}
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
				<View style={styles.viewBoton}>
					<Button
						buttonStyle={styles.botonAddNuevo}
						title="Añadir Nuevo Docente"
						onPress={() => this.addDocente()}
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
		height: 100,
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
	},
	viewBoton: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	botonAddNuevo: {
		backgroundColor: '#00A680',
		margin: 20
	}
});
