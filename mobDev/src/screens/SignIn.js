import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";
import firebase from '../../config/firebaseConfig';
import {useNavigation} from 'react-navigation-hooks';
import InputText from "../components/InputText";
import Button from "../components/Button";

import {MAIN_THEME} from "../constants/colors";
import {SIGN_UP, MAIN_PAGE} from '../constants/routes';

import {
  isPassword,
  isEmail
} from '../utils/validators';

export default function SignIn() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState({});
  const { navigate } = useNavigation();

  const loginValidation = () => {

    const errors = {};

    if (!email) {
      errors.email = "Email is required.";
    } else if (!isEmail(email)) {
      errors.email = "Email you try is incorrect type of email.";
    }

    if (!password) {
      errors.password = "Password cannot be empty.";
    } else if (!isPassword(password)) {
      errors.password = "Password must be at least 8 characters long.";
    }
    return errors;
  };

  const onSignInPress = async () => {

    setErrors(loginValidation());

    if (Object.values(errors).length !== 0) {
      return;
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      navigate(MAIN_PAGE);
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <InputText
          name="email"
          value={email}
          label="Email"
          onChange={setEmail}
          errorMessage={errors.email}
          withValidation={true}
        />
        <InputText
          name="password"
          value={password}
          label="Password"
          onChange={setPassword}
          isPassword={true}
          errorMessage={errors.password}
          withValidation={true}
        />
        <Button
          label='Log in'
          onPress={onSignInPress}
        />
        <Text style={styles.bottom}>
          Don't have an account?{"   "}
          <Text style={styles.hyperButton} onPress={() => navigate(SIGN_UP)}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: `${MAIN_THEME}`
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  },
  bottom: {
    marginTop: 30,
    textAlign: "center",
    color: "black",
    marginBottom: 40,
    fontSize: 16,
    fontWeight: "bold",
  },
  hyperButton: {
    color: "#ccc",
    textDecorationLine: "underline"
  },
});
