import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { Image, Icon, ListItem, Button, Rating, Avatar } from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import { firebaseApp } from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

export default class Docente extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reviews: null,
			startReview: null,
			limitReview: 5,
			isLoading: true
		}
	}

	componentDidMount(){
		this.loadReview();
	}
    
	checkUserLogin = () => {
		const user = firebase.auth().currentUser;
		if (user) {
			return true;
		}
		return false;
	};

	loadButtonAddReview = () => {
        if(!this.checkUserLogin()){ 
        	return (<Text>Para escribir una opinión debes iniciar sesión{" "}
        	<Text style={styles.botonlogin} onPress={() => this.props.navigation.navigate("Login")}>Aqui</Text> </Text>);
        }else{
        	return (<Button
						title="Agregar comentario"
						onPress={() => this.goToScreenAddReview()}
						buttonStyle={styles.btnAddReview}
					/>);
        }
	}
    

	checkAddReview = () => {
		const user = firebase.auth().currentUser;
		const idUSer = user.uid;
		const idDocente = this.props.navigation.state.params.docente.item.docente.id;
		
		const reviewsRef = db.collection('Reviews');
		const queryRef = reviewsRef
		.where("idUser", "==", idUSer)
		.where("idDocente", "==", idDocente);

		return queryRef.get().then(resolve => {
			const countReview = resolve.size;
			if(countReview > 0){
              return true;
			}else{
				return false;
			}
		})

	}
	goToScreenAddReview = ()  => {

        const {
			id,
			name 
		} = this.props.navigation.state.params.docente.item.docente;

		 this.checkAddReview().then(resolve => {
		 	
		 	if(resolve){
		 		this.refs.toast.show("Ya haz enviado un comentario de este docente, no puedes enviar mas", 2000);
		 	}else {

	 		const {
				id,
				name 
   			} = this.props.navigation.state.params.docente.item.docente;

			this.props.navigation.navigate('AddReview', { id, name });

		 	}
		 }) 
	}

	loadReview = async () => {
       const {limitReview} = this.state;
       const {id} = this.props.navigation.state.params.docente.item.docente;

       let resultReviews = [];

       const reviews = db.collection('Reviews').where("idDocente", "==", id).limit(limitReview);

       return await reviews.get().then(response => {
       	this.setState({
       		startReview: response.docs[response.docs.length -1]
       	})
       	response.forEach(doc=> {
       		let review = doc.data();
       		resultReviews.push(review);
       	})
       	this.setState({
       		reviews: resultReviews
       	})
       	
       })
	}

    renderFlatList = (reviews) => {
     if(reviews){
     	<Text>Lista</Text>
     }else{
     	return (<View style={styles.loadReviews}></View>)
     }
    }
	render() {  
		const {
			id, 
			name,
			city,
			school,
			image,
			facultad,
			description
		} = this.props.navigation.state.params.docente.item.docente;
		const {reviews} = this.state;
		const listExtraInfo = [ 
			{
				text: `${city},${school},${facultad}`,
				iconName: 'map-marker',
				iconType: 'material-community',
				action: null
			}
		];
		return (
			<View style={styles.viewBody}>
				<View style={styles.viewImage}>
					<Image
						source={{ uri: image }}
						placeholderContent={<ActivityIndicator />}
						style={styles.imageDocente}
					/>
				</View>
				<View style={styles.viewDocenteInfo}>
					<Text style={styles.nameDocente}>{name}</Text>
					<Text style={styles.descriptionDocente}>{description}</Text>
				</View>
				<View style={styles.ViewDocenteInfoExtra}>
					<Text style={styles.title}>Información acerca del docente</Text>
					{listExtraInfo.map((item, index) => (
						<ListItem
							key={index}
							title={item.text}
							leftIcon={<Icon name={item.iconName} type={item.iconType} />}
						/>
					))}
				</View>
				<View style={styles.boton}>
				{this.loadButtonAddReview()}					
				</View>
				{this.renderFlatList(reviews)}
				<Toast ref="toast" position ="bottom" positionValue={320} fadeInDuration={1000} fadeOutDuration={1000} opacity={0.8} textStyle={{color: "#FFF" }} />
			</View>
		); 
	}
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	viewImage: {
		width: '100%'
	},
	imageDocente: {
		width: '100%',
		height: 200,
		resizeMode: 'cover'
	},
	viewDocenteInfo: {
		margin: 15
	},
	nameDocente: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	descriptionDocente: {
		marginTop: 5,
		color: 'grey'
	},
	ViewDocenteInfoExtra: {
		margin: 15,
		marginTop: 25
	},
	title: {
		fontSize: 10,
		fontWeight: 'bold',
		marginBottom: 10
	},
	boton: {
		margin: 20
	},
	btnAddReview: {
		backgroundColor: '#BB0000'
	},
	botonlogin: {
		color: "#BB0000",
		fontWeight: "bold"
	},
	loadReviews: {
		marginTop: 20,
		alignItem: "Center"
	}
});
