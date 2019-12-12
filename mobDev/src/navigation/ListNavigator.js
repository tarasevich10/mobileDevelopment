import { createStackNavigator } from "react-navigation-stack";

import { LIST_PAGE, DETAILS_PAGE, ADDING_PAGE } from "../constants/routes";
import ItemDetails from "../screens/ItemDetails";
import ListScreen from "../screens/ListScreen";
import AddingPage from "../screens/AddingPage";

export default ListNavigator = createStackNavigator(
  {
    [LIST_PAGE]: { screen: ListScreen },
    [DETAILS_PAGE]: { screen: ItemDetails },
    [ADDING_PAGE] : {screen : AddingPage}
  },
  {
    headerMode: "none",
  },
);
