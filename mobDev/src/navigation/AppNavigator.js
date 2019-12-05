import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import MainPage from "../screens/MainPage";
import { SIGN_UP } from "../constants/routes";

const AppNavigator = createSwitchNavigator(
  {
    SignIn: SignIn,
    SignUp: SignUp,
    Main: MainPage
  },
  {
    initialRouteName: SIGN_UP,
  },
);

export default createAppContainer(AppNavigator);
