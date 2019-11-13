import React, { Component } from 'react';
import { StyleSheet, View,  ActivityIndicator} from 'react-native';
import {  Rating, AirbnbRating, Button, Text } from 'react-native-elements';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import {AddReviewStruct, AddReviewOptions} from '../../forms/AddReview';

export default class AddReview extends Component{

     constructor(props){ 
       super(props);
     }

  render(){
  	return (
          <View style={styles.viewBody} >
              <View style={styles.viewRating} >
                 <AirbnbRating
                  ref="rating"
                  count={5}
                  reviews={[
                  	 "No recomendable",
                  	 "Malo",
                  	 "Normal",
                  	 "Bueno",
                  	 "Excelene"
                  	]}
                     defaultRating={0}
                     size={35}
	
                  />
              </View>
              <View style={styles.formReview}>
                <Form 
                ref="addReviewForm"
                type={AddReviewStruct}
                option={AddReviewOptions}
                />
              </View>
              <View style={styles.sendReview}>
                <Button buttonStyle={styles.botonPublicar} title="Publicar" />
              </View>
          </View>
  		)
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
		justifyContent: "flex-end",
		marginBottom: 30,
		marginLeft: 20,
		marginRight: 20
	},
	botonPublicar: {
		backgroundColor: "#00A680"
	}
	
	
}) 