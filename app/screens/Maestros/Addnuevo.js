import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Icon, Image, Button, Text, Overlay } from 'react-native-elements';
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
	constructor(props) {
		super(props);

		this.state = {
			imageUri: '',
			loading: false,
			formData: {
				name: '',
				city: '',
				school: '',
				facultad: '',
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
		const { name, city, school, facultad, description } = this.state.formData;

		if (imageUri && name && school && city && description) {
			this.setState({
				loading: true
			});

			db
				.collection('Docentes')
				.add({ name, city, school, facultad, description, image: '', createat: new Date() })
				.then((resolve) => {
					const docenteId = resolve.id;

					uploadImage(imageUri, docenteId, 'Docentes')
						.then((resolve) => {
							const docenteRef = db.collection('Docentes').doc(docenteId);

							docenteRef
								.update({ image: resolve })
								.then(() => {
									this.refs.toast.show('Docente agregado correctamente', 500, () => {
										this.props.navigation.state.params.loadDocentes();
										this.props.navigation.goBack();
									});
									this.setState({ loading: false });
								})
								.catch((err) => {
									this.refs.toast.show('Error al guardar datos, intente mas tarde', 1500);
									this.setState({ loading: false });
								});
						})
						.catch((err) => {
							this.refs.toast.show('Error de servidor intente mas tarde', 1500);
							this.setState({ loading: false });
						});
				})
				.catch(() => {
					this.refs.toast.show('Falla de servidor favor de intentar mas tarde', 1500);
					this.setState({ loading: false });
				});
		} else {
			this.refs.toast.show('Tienes que llenar todos los campos', 1500);
		}
	};
	render() {
		const { imageUri, loading } = this.state;
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
				<View>
					<Overlay overlayStyle={styles.overlayLoading} isVisible={loading} width="auto" height="auto">
						<Text style={styles.overlaText}>Añadiendo docente</Text>
						<ActivityIndicator size="large" color="#00a68a0" />
					</Overlay>
				</View>
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
	},
	overlayLoading: {
		padding: 20
	},
	overlaText: {
		marginBottom: 20,
		fontSize: 20
	}
});
