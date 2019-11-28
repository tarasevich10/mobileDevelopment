import React from "react";
import {createAppContainer, createSwitchNavigator} from "react-navigation";

import SignIn from "../src/screens/SignIn";
import SignUp from "../src/screens/SignUp";
import MainPage from "../src/screens/MainPage";

const AppNavigator = createSwitchNavigator(
  {
    SignIn: SignIn,
    SignUp: SignUp,
    Main: MainPage
  },
  {
    initialRouteName: 'SignUp',
  },
);

export default createAppContainer(AppNavigator);
