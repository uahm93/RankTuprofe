import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { white } from "ansi-colors";

export default class TopFive extends Component {
  render() {
    return (
      <View style={styles.viewBody}>
        <Text>Pantalla top 5</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    alignContent: "center"
  }
});
