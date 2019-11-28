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



// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';

// export default function App() {
// 	const [count, setCount] = useState(0);

// 	return (
// 		<View style={styles.container}>
// 			<Text>You clicked {count} times.</Text>
// 			<Button
// 				onPress={() => setCount(count + 1)}
// 				title="Click me"
// 				color="red"
// 				accessibilityLabel="Click this button to increase count"
// 			/>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#F5FCFF'
// 	},
// 	welcome: {
// 		fontSize: 20,
// 		textAlign: 'center',
// 		margin: 10
// 	},
// 	instructions: {
// 		textAlign: 'center',
// 		color: '#333333',
// 		marginBottom: 5
// 	}
// });