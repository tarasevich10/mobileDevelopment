/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';
import SignIn from './src/screens/SignIn';
import AppNavigator from './navigation/AppNavigator';

export default function App() {

  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    </Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: "100%",
    height: "100%",
  },
});
