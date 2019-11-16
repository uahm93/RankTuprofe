import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { white } from 'ansi-colors';
import { SearchBar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
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
		console.log(this.state);
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
	render() {
		const { search, formDocente } = this.state;
		return (
			<View style={styles.viewBody}>
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
							onChangeText={this.searchEscuela}
							value={search}
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
							onChangeText={this.searchEscuela}
							value={search}
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
			</View>
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
		right: 0
	},
	searchUniversidad: {
		margin: 10,
		marginTop: 20
	},
	botonInstituto: {
		backgroundColor: '#BB0000',
		height: 100,
		width: 180
	},
	botonDocente: {
		height: 100,
		width: 180
	}
});
