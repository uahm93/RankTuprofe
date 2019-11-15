import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Rating, AirbnbRating, Button, Text, Overlay } from 'react-native-elements';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import { AddReviewStruct, AddReviewOptions } from '../../forms/AddReview';
import Toast, { DURATION } from 'react-native-easy-toast';

import { firebaseApp } from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

export default class AddReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
	}

	sendReview = () => {
		const ratingValue = this.refs.rating.state.position;
		const user = firebase.auth().currentUser;


		this.setState({
			loading: true
		});

		if (ratingValue == 0) {
			this.refs.toast.show('Tienes que agregar una puntuacion', 1500);
			this.setState({
				loading: false
			});
		} else {
			const validate = this.refs.addReviewForm.getValue();
			console.log(validate);
			if (!validate) {
				this.refs.toast.show('Completa el formuario', 1500);
				this.setState({ loading: false });
			} else {
				//const user = firebase.auth().currentUser;

				const data = {
					idUser: user.uid,
					avatarUser: user.photoURL,
					idDocente: this.props.navigation.state.params.id,
					title: validate.titulo,
					review: validate.review,
					rating: ratingValue,
					createat: new Date()
				};

				db
					.collection('Reviews')
					.add(data)
					.then(() => {
						this.setState({
							loading: false
						});
						this.refs.toast.show('Comentario agregado correctamente', 1500, () => {
							this.props.navigation.goBack();
						});
					})
					.catch(() => {
						this.refs.toast.show('Error al publicar el comentario, intente mas tarde', 1500);
					});
			}
		}
	};

	render() {
		const { loading } = this.state;
		return (
			<View style={styles.viewBody}>
				<View style={styles.viewRating}>
					<AirbnbRating
						ref="rating"
						count={5}
						reviews={[ 'No recomendable', 'Malo', 'Normal', 'Bueno', 'Excelene' ]}
						defaultRating={0}
						size={35}
					/>
				</View>
				<View style={styles.formReview}>
					<Form ref="addReviewForm" type={AddReviewStruct} option={AddReviewOptions} />
				</View>
				<View style={styles.sendReview}>
					<Button buttonStyle={styles.botonPublicar} onPress={() => this.sendReview()} title="Publicar" />
				</View>
				<Overlay overlayStyle={styles.overlayStyle} isVisible={loading} width="auto" height="auto">
					<View>
						<Text style={styles.TextStyle}>Publicando comentario</Text>
						<ActivityIndicator size="large" color="#BB0000" />
					</View>
				</Overlay>
				<Toast
					ref="toast"
					position="bottom"
					positionValue={320}
					fadeInDuration={1000}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: '#FFFF' }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	formReview: {
		margin: 10,
		marginTop: 40
	},
	sendReview: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 30,
		marginLeft: 20,
		marginRight: 20
	},
	botonPublicar: {
		backgroundColor: '#BB0000'
	},
	overlayStyle: {
		padding: 30
	},
	TextStyle: {
		marginBottom: 20,
		fontSize: 20
	}
});
