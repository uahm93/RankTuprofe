import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';

export default class AddReview extends Component{
     constructor(props){
       super(props)
     }

  render(){
  	return (
          <View style={styles.viewBody}>
              <View>
                 <Text>Agregar AddReview</Text>
              </View>
          </View>
  		)
  }   
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	
}) 