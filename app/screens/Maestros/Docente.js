import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {Image, Icon, ListItem, Button} from 'react-native-elements';

export default class Docente extends Component {
   
   	constructor(props) {
   		super(props);
    }

 
   render(){
   	const {id, name, city, school, image, facultad, description} = this.props.navigation.state.params.docente.item.docente;
   	const listExtraInfo = [{

   	   text: `${city},${school},${facultad}`,
   	   iconName: 'map-marker',
       iconType: 'material-community',
       action: null

   	}]
   	return (
   		<View style={styles.viewBody}>

   		  <View style={styles.viewImage}>
             
             <Image  
             source = {{ uri: image }} 
             placeholderContent={<ActivityIndicator />}
             style={styles.imageDocente} 
              />

   		  </View>
   		  <View style={styles.viewDocenteInfo}>
   		  <Text style={styles.nameDocente} >{name}</Text> 
            <Text style={styles.descriptionDocente} >{description}</Text> 
   		  </View>
         <View style={styles.ViewDocenteInfoExtra} >
            <Text style={styles.title}>Información acerca del docente</Text>
            {listExtraInfo.map((item, index) => (

                  <ListItem 
                  key={index}
                  title={item.text}
                  leftIcon={<Icon name={item.iconName} type={item.iconType} />}

                   />
            	)
            )}
         </View>
         <View style={styles.boton}>
             <Button 
               title="Agregar comentario"
               onPress={() => this.props.navigation.navigate("AddReview" ,{id, name} )}
               buttonStyle={styles.btnAddReview}
                />
         </View>
   		</View>
   		)
   }
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	viewImage: {
		width: "100%",
	},
	imageDocente:{
		width: "100%",
		height: 200,
		resizeMode: "cover" 
	},
	viewDocenteInfo: {
		margin: 15
	},
	nameDocente: {
		fontSize: 20,
		fontWeight: "bold",

	},
	descriptionDocente: {
		marginTop: 5,
		color: "grey"
	},
	ViewDocenteInfoExtra: {
		margin: 15,
		marginTop: 25
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10
	},
	boton: {
		margin: 20,

	},
	btnAddReview: {
		backgroundColor: "#BB0000"
	}
}) 