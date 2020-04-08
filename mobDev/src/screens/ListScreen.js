import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from 'react-navigation-hooks';
import { DETAILS_PAGE, SIGN_IN } from "../constants/routes";
import ListPage from "../components/ListPage";
import firebase from "../../config/firebaseConfig";
import { BUTTON_COLOR } from "../constants/colors";

const ListScreen = () => {
  const { navigate } = useNavigation();

  const signoutPress = async () => {
    try {
      await firebase.auth().signOut();

      navigate(SIGN_IN);
    } catch (e) {
      alert(e);
    }
  };

  const handleOpenPanelDetails = panel => navigate(DETAILS_PAGE, { panel });

  return (
    <View style={styles.backgroundContainer}>
      <Appbar style={styles.appbar}>
        <Appbar.Action icon='logout' onPress={signoutPress} />
        <Appbar.Content title="Steam games" />
      </Appbar>
      <ListPage openDetails={handleOpenPanelDetails} />
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
    backgroundColor: `${BUTTON_COLOR}`,
  },
  appbar: {
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default ListScreen;
