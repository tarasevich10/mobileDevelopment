import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Snackbar } from "react-native-paper";
import List from "../components/List";
import { DATA_URL } from "../constants/routes";
import { ACTIVITY_INDICATOR } from "../constants/colors";

export default function ListPage({ openDetails }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isNetworkAvailable, setIsNetworkAvailable] = useState(true);
  const [data, setData] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [snackbarDialog, setSnackbarDialog] = useState(null);

  const renderList = ({ item }) => (
    <List item={item} openDetails={openDetails} />
  );

  const generateKeyExtractor = item => item.id + "";

  const getPanelsInfo = () => {
    setIsLoading(true);

    fetch(DATA_URL)
      .then(res => res.json())
      .then(data => setData(data.panels))
      .catch(e => setSnackbarDialog(e.message))
      .finally(() => setIsPageLoading(false));
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsNetworkAvailable(state.isConnected);
    })

    return () => unsubscribe();
  });

  useEffect(() => {
    displayList();
  }, [isNetworkAvailable]);

  const displayList = () => {
    if (isNetworkAvailable) {
      getPanelsInfo();
    } else {
      setSnackbarDialog("No network. Reload this page :(");
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isPageLoading ?
        <ActivityIndicator style={styles.indicator} size="large" color={ACTIVITY_INDICATOR} /> :
        <View>
          <FlatList
            style={styles.list}
            data={data}
            keyExtractor={generateKeyExtractor}
            refreshing={isLoading}
            onRefresh={displayList}
            renderItem={renderList}
          />
          <Snackbar
            visible={!!snackbarDialog}
            onDismiss={() => setSnackbarDialog("")}
            duration={3000}
            action={{
              label: "Thanks!",
              onPress: () => setSnackbarDialog(""),
            }}>
            {snackbarDialog}
          </Snackbar>
        </View>
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  indicator: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  list: {
    width: "100%",
    paddingHorizontal: "3%",
  },
});
