import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text
} from "react-native";
import { LIST_PAGE, EMPTY_PAGE, PROFILE_PAGE } from '../constants/routes';
import Profile from '../screens/Profile';
import ListNavigator from "./ListNavigator";


export default TabNavigator = createMaterialBottomTabNavigator(
  {
    [LIST_PAGE]: {
      screen: ListNavigator,
      navigationOptions: {
        title: "List",
        tabBarIcon: ({ }) => <Icon name="list" size={22} />
      },
    },
    [EMPTY_PAGE]: {
      screen: () => (
        <View>
          <Text>
            TAB 2
          </Text>
        </View>
      ),
      navigationOptions: {
        title: "Rocket",
        tabBarIcon: ({ }) => <Icon name="rocket" size={22} />
      },
    },
    [PROFILE_PAGE]: {
      screen: Profile,
      navigationOptions: {
        title: "Home",
        tabBarIcon: ({ }) => <Icon name="home" size={22} />
      },
    },
  },
  {
    shifting: true,
    sceneAnimationEnabled: false,
    barStyle: { backgroundColor: "#face55" },
    initialRouteName: LIST_PAGE,
    backBehavior: "history",
    activeColor: "black",
    inactiveColor: "black",
  },
);
