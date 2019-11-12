import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { white } from 'ansi-colors';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseApp } from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Image } from 'react-native-elements';

const db = firebase.firestore(firebaseApp);
export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			login: false,
			docente: null,
			startDocente: null,
			limitDocente: 8,
			isLoading: true
		};
	}
	componentDidMount() {
		this.checkLogin();
		this.loadDocentes();
	}
	checkLogin = () => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					login: true
				});
			} else {
				this.setState({
					login: false
				});
			}
		});
	};
	goToScreen = (nameScreen) => {
		this.props.navigation.navigate(nameScreen);
	};
	loadDocentes = async () => {
		const limitDocente = this.state;
		let resultDocente = [];

		const docentes = db.collection('Docentes').orderBy('createat', 'desc').limit(8);

		await docentes.get().then((response) => {
			this.setState({
				startDocente: response.docs[response.docs.length - 1]
			});
			response.forEach((element) => {
				let docente = element.data();
				docente.id = element.id;
				resultDocente.push({ docente });
			});
		});
		this.setState({
			docente: resultDocente
		});
	};

	handleLoadMore = async () => {
		const { docente, limitDocente, startDocente } = this.state;
		let resulDocentes = [];
		const docentesDB = db
			.collection('Docentes')
			.orderBy('createat', 'desc')
			.startAfter(startDocente.data().createat)
			.limit(8);

		// await docentesDB.get().then((response) => {
		// 	if (response.docs.length > 0) {
		// 		this.setState({
		// 			startDocente: response.doc(response.docs.length - 1)
		// 		});
		// 	} else {
		// 		this.setState({
		// 			isLoading: false
		// 		});
		// 	}
		// 	response.forEach((doc) => {
		// 		let docente = doc.data();
		// 		docente.id = doc.id;
		// 		resulDocentes.push({ docente });
		// 	});
		// 	this.setState({
		// 		docente: resulDocentes
		// 	});
		// });
	};

	renderFooter = () => {
		if (this.state.isLoading) {
			return <ActivityIndicator style={styles.loaderMas} size="large" />;
		} else {
			return (
				<View style={styles.noFoundmore}>
					<Text>Ya no hay mas registros</Text>
				</View>
			);
		}
	};

	renderRow = (docentesObject) => {
		const { name, school, image, facultad, description, city, createat } = docentesObject.item.docente;

		return (
			<TouchableOpacity onPress={() => this.clickDocente(docentesObject)}>
				<View style={styles.viewDocentes}>
					<View style={styles.viewDocenteImage}>
						<Image resizeMode="cover" source={{ uri: image }} style={styles.imageDoente} />
					</View>
					<View>
						<Text style={styles.flatListName}> {name} </Text>
						<Text style={styles.flatListAdress}>
							{city}, {school}, {facultad}
						</Text>
						<Text style={styles.flatListDescription}>{description.substr(0, 60)}...</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	renderFlatList = (docente) => {
		if (docente) {
			return (
				<FlatList
					data={this.state.docente}
					renderItem={this.renderRow}
					keyExtractor={(item, index) => index.toString()}
					onEndReached={this.handleLoadMore}
					onEndReachedThreshold={0.1}
					ListFooterComponent={this.renderFooter}
				/>
			);
		} else {
			return (
				<View style={styles.ActivityIndicatorStyles}>
					<ActivityIndicator size="large" />
					<Text> Cargando docentes </Text>
				</View>
			);
		}
	};

	clickDocente = (docente) => {
		console.log('haz dado click en ');
		console.log(docente);
	};

	render() {
		const { login, docente } = this.state;
		return (
			<View style={styles.viewBody}>
				{this.renderFlatList(docente)}
				{login ? (
					<ActionButton
						buttonColor="#00a68a"
						onPress={() => {
							this.goToScreen('AddNuevo');
						}}
					/>
				) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	ActivityIndicatorStyles: {
		marginTop: 20,
		alignItems: 'center'
	},
	viewDocentes: {
		flexDirection: 'row',
		margin: 20
	},
	imageDoente: {
		width: 80,
		height: 80
	},
	viewDocenteImage: {
		marginRight: 15
	},
	flatListName: {
		fontWeight: 'bold'
	},
	flatListAdress: {
		paddingTop: 2,
		color: 'grey'
	},
	flatListDescription: {
		paddingTop: 2,
		color: 'grey',
		width: 300
	},
	loaderMas: {
		marginTop: 10,
		marginBottom: 10
	},
	noFoundmore: {
		marginTop: 10,
		marginBottom: 20,
		alignItems: 'center'
	}
});
