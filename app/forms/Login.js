import React from "react";

import t from "tcomb-form-native";

import formValidation from "../utils/Validation";
import inputTemplate from "./templates/Input";

export const LoginStruct = t.struct({
  email: formValidation.email,
  password: formValidation.password
});

export const LoginOptions = {
  fields: {
    email: {
      template: inputTemplate,
      config: {
        placeholder: "Ingresa tu correo",
        iconType: "material-community",
        iconName: "at"
      }
    },
    password: {
      template: inputTemplate,
      config: {
        placeholder: "Ingresa tu contraseña",
        iconType: "material-community",
        iconName: "lock-outline",
        password: true,
        secureTextEntry: true
      }
    }
  }
};
