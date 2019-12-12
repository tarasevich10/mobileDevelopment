import { createAppContainer, createSwitchNavigator } from "react-navigation";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { SIGN_UP } from "../constants/routes";
import TabNavigator from './TabNavigator';

const AppNavigator = createSwitchNavigator(
  {
    SignIn: SignIn,
    SignUp: SignUp,
    Main: TabNavigator
  },
  {
    initialRouteName: SIGN_UP,
  },
);

export default createAppContainer(AppNavigator);
