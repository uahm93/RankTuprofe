import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { white } from 'ansi-colors';
import { SearchBar, Button, ListItem, Icon } from 'react-native-elements';
import { firebaseApp } from '../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { FireSQL } from 'firesql';
const fireSQL = new FireSQL(firebase.firestore(), { includeId: 'id' });

const db = firebase.firestore(firebaseApp);

export default class Search extends Component {
	constructor() {
		super();
		this.state = {
			search: '',
			docentes: null,
			escuela: '',
			facultad: '',
			formDocente: ''
		};
	}
	searchDocente = async (value) => {
		this.setState({ search: value });
		let resultDocentes = null;

		const docentesList = fireSQL.query(`
     SELECT * 
     FROM Docentes
     WHERE name LIKE '${value}%'
    `);
		await docentesList
			.then((response) => {
				resultDocentes = response;
			})
			.catch(() => {});

		this.setState({
			docentes: resultDocentes
		});
	};

	renderListDocentes = (docentes) => {
		if (docentes) {
			return (
				<View>
					{docentes.map((docente, index) => {
						let docenteClick = {
							item: {
								docente: null
							}
						};
						docenteClick.item.docente = docente;
						return (
							<ListItem
								key={index}
								title={docente.name}
								subtitle={`${docente.city}, ${docente.school}, ${docente.facultad}`}
								leftAvatar={{ source: { uri: docente.image } }}
								rightIcon={<Icon type="material-community" name="chevron-right" />}
								onPress={() => this.clickDocente(docenteClick)}
							/>
						);
					})}
				</View>
			);
		} else {
			return (
				<View>
					<Text style={styles.notfoundText}>Busca tus docentes</Text>
				</View>
			);
		}
	};
	searchUniversidad = async (value) => {
		this.setState({ escuela: value });
		let resultDocentes = null;

		const docentesList = fireSQL.query(`
			SELECT * 
			FROM Docentes
			WHERE school LIKE '${value}%' 
			`);
		await docentesList
			.then((response) => {
				resultDocentes = response;
			})
			.catch(() => {});

		this.setState({
			docentes: resultDocentes
		});
	};
	searchFacultad = async (value) => {
		this.setState({ facultad: value });
		// console.log(this.state.escuela);
		// console.log(this.state.facultad);
		let resultDocentes = null;

		const docentesList = fireSQL.query(`
			SELECT * 
			FROM Docentes
			WHERE facultad LIKE '${value}%'
			`);
		await docentesList
			.then((response) => {
				resultDocentes = response;
			})
			.catch(() => {});

		this.setState({
			docentes: resultDocentes
		});
	};
	desplegarDocente = () => {
		this.setState({
			formDocente: true
		});
	};
	desplegarEscuela = () => {
		this.setState({
			formDocente: false
		});
	};
	clickDocente = (docente) => {
		this.props.navigation.navigate('Docente', { docente });
	};
	render() {
		const { search, formDocente, docentes, escuela, facultad } = this.state;
		return (
			<ScrollView style={styles.viewBody}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={styles.searchUniversidad}>
						<Button
							buttonStyle={styles.botonInstituto}
							icon={{
								name: 'school',
								size: 25,
								color: 'white'
							}}
							title="Instituto"
							onPress={this.desplegarEscuela}
						/>
					</View>
					<View style={styles.searchDocente}>
						<Button
							buttonStyle={styles.botonDocente}
							icon={{
								name: 'teach',
								type: 'material-community',
								size: 25,
								color: 'white'
							}}
							onPress={this.desplegarDocente}
							title="Docente"
						/>
					</View>
				</View>
				{formDocente ? (
					<SearchBar
						placeholder="Buscar Docente"
						onChangeText={this.searchDocente}
						value={search}
						containerStyle={styles.searchStyle}
						searchIcon={{
							name: 'teach',
							type: 'material-community',
							size: 25,
							color: 'white'
						}}
					/>
				) : (
					<View>
						<SearchBar
							placeholder="Buscar Instituto"
							onChangeText={this.searchUniversidad}
							value={escuela}
							containerStyle={styles.searchStyle}
							searchIcon={{
								name: 'office-building',
								type: 'material-community',
								size: 25,
								color: 'white'
							}}
						/>
						<SearchBar
							placeholder="Buscar Facultad"
							onChangeText={this.searchFacultad}
							value={facultad}
							containerStyle={styles.searchStyle}
							searchIcon={{
								name: 'school',
								type: 'material-community',
								size: 25,
								color: 'white'
							}}
						/>
					</View>
				)}
				{this.renderListDocentes(docentes)}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	searchStyle: {
		marginBottom: 20
	},
	searchDocente: {
		margin: 10,
		marginTop: 20,
		marginRight: 10,
		right: 0
	},
	searchUniversidad: {
		margin: 10,
		marginTop: 20
	},
	botonInstituto: {
		backgroundColor: '#BB0000',
		height: 80,
		width: 140
	},
	botonDocente: {
		height: 80,
		width: 140
	},
	notfoundText: {
		textAlign: 'center'
	}
});
