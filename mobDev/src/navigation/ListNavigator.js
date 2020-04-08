import { createStackNavigator } from "react-navigation-stack";

import { LIST_PAGE, DETAILS_PAGE } from "../constants/routes";
import ItemDetails from "../screens/ItemDetails";
import ListScreen from "../screens/ListScreen";

export default ListNavigator = createStackNavigator(
  {
    [LIST_PAGE]: { screen: ListScreen },
    [DETAILS_PAGE]: { screen: ItemDetails },
  },
  {
    headerMode: "none",
  },
);
