import React from "react";
import { View, Text, StyleSheet } from "react-native";

import firebase from '../../config/firebaseConfig';
import { useNavigation } from 'react-navigation-hooks';

import Button from '../components/Button';

import { MAIN_THEME, WHITE } from '../constants/colors';
import { SIGN_IN } from '../constants/routes';

export default function SignIn() {
  const { navigate } = useNavigation();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();

      navigate(SIGN_IN);
    } catch (error) {
      alert("Couldn't sign out");
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      <Text style={styles.heading}>{`Welcome, ${
        firebase.auth().currentUser.displayName
        }`}</Text>
      <View style={styles.submitButton}>
        <Button
          label="Sign out"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${MAIN_THEME}`,
  },
  heading: {
    color: `${WHITE}`,
    fontSize: 20,
  },

  submitButton: {
    width: 200,
    marginHorizontal: "auto",
    marginTop: 16,
  },
});
