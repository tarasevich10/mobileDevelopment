import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";

import firebase from '../../config/firebaseConfig';
import InputText from "../components/InputText";
import Button from "../components/Button";
import { useNavigation } from 'react-navigation-hooks';

import { MAIN_THEME } from "../constants/colors";
import { SIGN_IN, MAIN_PAGE } from '../constants/routes';

import {
  isPhoneNumber,
  isPassword,
  isEmail
} from '../../utils/validators';

export default function SignUp() {
  const [username, setUsername] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState({});

  const { navigate } = useNavigation();

  const formValidation = () => {
    const errors = {};

    if (!password) {
      errors.password = "Password cannot be empty.";
    } else if (!isPassword(password)) {
      errors.password = "Password must be at least 8 characters long.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!isEmail(email)) {
      errors.email = "Email you try is incorrect.";
    }

    if (!username) {
      errors.username = "Username is required.";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Phone number cannot be empty.";
    } else if (!isPhoneNumber(phoneNumber)) {
      errors.phoneNumber = "Phone number is incorrect, please try again.";
    }

    return errors;
  };

  const onSignUnPress = async () => {

    setErrors(formValidation());

    if (Object.keys(errors).length !== 0) {
      return;
    }

    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await user.updateProfile({ displayName: username });
      navigate(MAIN_PAGE);

    } catch ({ message }) {
      alert(message);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <InputText
          name="username"
          value={username}
          label="Username"
          onChange={setUsername}
          errorMessage={errors.username}
          withValidation={true}
        />
        <InputText
          name="phoneNumber"
          value={phoneNumber}
          label="Phone"
          onChange={setPhoneNumber}
          errorMessage={errors.phoneNumber}
          withValidation={true}
        />
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
          label='Sign Up'
          onPress={onSignUnPress}
        />
        <Text style={styles.bottom}>
          Already have an account?{"   "}
          <Text style={styles.hyperButton} onPress={() => navigate(SIGN_IN)}>
            Log In
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
  submitButton: {
    width: 200,
    marginHorizontal: "auto",
    marginTop: 2,
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
