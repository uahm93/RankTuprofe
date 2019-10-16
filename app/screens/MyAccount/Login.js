import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
  Image,
  Text,
  Button,
  Divider,
  SocialIcon
} from "react-native-elements";
import t from "tcomb-form-native";
import * as firebase from "firebase";
import Toast, { DURATION } from "react-native-easy-toast";

import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../utils/Social";

const Form = t.form.Form;

import { LoginStruct, LoginOptions } from "../../forms/Login";
import { bold } from "ansi-colors";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginStruct: LoginStruct,
      loginOptions: LoginOptions,
      loginData: {
        email: "",
        password: ""
      },
      loginErrorMessage: ""
    };
  }
  login = () => {
    const validate = this.refs.loginForm.getValue();
    if (!validate) {
      this.setState({ loginErrorMessage: "Los datos ingresados son erroneos" });
    } else {
      this.setState({ loginErrorMessage: "" });

      firebase
        .auth()
        .signInWithEmailAndPassword(validate.email, validate.password)
        .then(() => {
          this.refs.toastLogin.show("Inicio de sesión correcto", 200, () => {
            this.props.navigation.goBack();
          });
        })
        .catch(erro => {
          this.refs.toastLogin.show(
            "Inicio de sesión incorrecto, verifique sus datos",
            2500
          );
        });
    }
  };

  loginFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("646839249151500", {
        permissions: ["public_profile"]
      });

      if (type == "success") {
        const credentials = firebase.auth.FacebookAuthProvider.credential(
          token
        );
        firebase
          .auth()
          .signInWithCredential(credentials)
          .then(() => {
            this.refs.toastLogin.show("Inicio de sesión correcto", 100, () => {
              this.props.navigation.goBack();
            });
          })
          .catch(err =>
            this.refs.toastLogin.show(
              "Ups! Ha ocurrido un error inesperado, intente mas tarde",
              300
            )
          );
      } else if (type == "cancel") {
        this.refs.toastLogin.show("Inicio de sesión cancelado", 300);
      } else {
        this.refs.toastLogin.show(
          "Ups! Ha ocurrido un error inesperado, intente mas tarde",
          300
        );
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  onChangeFormLogin = value => {
    this.setState({ loginData: value });
  };
  render() {
    const { loginStruct, loginOptions, loginErrorMessage } = this.state;
    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/logo2.png")}
          style={styles.logo}
          containerStyle={styles.contaimerLogo}
          resizeMode="contain"
        />
        <View style={styles.viewForm}>
          <Form
            ref="loginForm"
            type={LoginStruct}
            options={LoginOptions}
            value={this.state.loginData}
            onChange={value => this.onChangeFormLogin(value)}
          />
          <Button
            buttonStyle={styles.buttonLoginContainer}
            title="Iniciar sesión"
            onPress={() => this.login()}
          />
          <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta?
            <Text
              style={styles.btnRegistrate}
              onPress={() => this.props.navigation.navigate("Register")}
            >
              Registrate
            </Text>
          </Text>
          <Text style={styles.loginErrorMessage}>{loginErrorMessage}</Text>
          <Divider style={styles.divider} />
          <SocialIcon
            title="Ingresa con Facebook"
            button
            type="facebook"
            iconSize={15}
            onPress={() => this.loginFacebook()}
          />
        </View>
        <Toast
          ref="toastLogin"
          position="bottom"
          positionValue={400}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "white" }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  },
  contaimerLogo: {
    alignItems: "center"
  },
  logo: {
    width: 300,
    height: 100
  },
  viewForm: {
    marginTop: 10
  },
  buttonLoginContainer: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  loginErrorMessage: {
    color: "#f00",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20
  },
  divider: {
    marginTop: -20,
    backgroundColor: "#00a680",
    marginBottom: 10
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  btnRegistrate: {
    color: "#00a680",
    fontWeight: "bold"
  }
});
