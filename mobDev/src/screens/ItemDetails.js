import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Appbar, Caption } from "react-native-paper";
import { NavigationActions } from "react-navigation";
import { BUTTON_COLOR } from "../constants/colors";

export default ItemDetails = ({ navigation }) => {
  const [item, setItem] = useState({})
  const { browserRequirements, publisher, userRegistration, startDate, gameStatus: imageUrl } = item;

  const gameInfo = [
    {
      id: '1',
      label: "Browser",
      text: browserRequirements
    },
    {
      id: '2',
      label: "Publisher",
      text: publisher
    },
    {
      id: '3',
      label: "Registration",
      text: userRegistration
    },
    {
      id: '4',
      label: "Start Date",
      text: startDate
    }
  ];

  useEffect(() => {
    setItem(navigation.getParam("panel", {}));
  }, []);

  const handleBackPress = () =>
    navigation.dispatch(NavigationActions.back());


  return (
    <View style={styles.backgroundContainer}>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={handleBackPress} />
        <Appbar.Content title="Details" />
      </Appbar>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <Image
            resizeMode={"contain"}
            source={{ uri: imageUrl }}
            style={styles.image}
          />
          {gameInfo && gameInfo.map((field, key) => (
            <View key={key}>
              <Caption style={styles.caption}>{field.label}</Caption>
              <Text style={styles.text}>{field.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${BUTTON_COLOR}`,
  },
  appbar: {
    width: "100%",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingHorizontal: "5%",
    paddingTop: "3%",
  },
  image: {
    alignSelf: "stretch",
    width: "100%",
    height: 240,
  },
  caption: {
    color: "white",
    fontSize: 16,
  },
  text: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },
});
