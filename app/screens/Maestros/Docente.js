import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';

export default class Docente extends Component {
   
   	constructor(props) {
   		super(props);
    }

 
   render(){
   	return (
   		<View style={styles.viewBody}>

   		  <Text>Docente</Text>

   		</View>
   		)
   }
}

const styles = StyleSheet.create({
	viewBody: {
		flex: 1
	}
}) 