import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import {
  Card,
  Title
} from "react-native-paper";
import Collapsible from "react-native-collapsible";
import Button from './Button';
import { MAIN_THEME } from '../constants/colors';


const List = ({
  item
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
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

  return (
    <View>
      <Card style={styles.cardContainer}>
        <Card.Content style={styles.content}>
          <Card.Cover source={imageUrl ? { uri: imageUrl } : null} />
          <View style={styles.textContent}>
            <Title style={styles.header}>{item.name}</Title>
            <Button
              onPress={() => setIsCollapsed(!isCollapsed)}
              label={"Show game info"} />
            <Collapsible align="bottom" collapsed={isCollapsed}>
              <View style={styles.collapsedContent}>
                {gameInfo && gameInfo.map((field, key) => (
                  <Text style={styles.text} key={key}>
                    {field.label} : {field.text}
                  </Text>
                ))}
              </View>
            </Collapsible>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 15,
    paddingHorizontal: 0,
    paddingBottom: 10,
    backgroundColor: `${MAIN_THEME}`,
  },

  header: {
    fontSize: 24,
    color: "white",
    textAlign: "center"
  },

  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },

  showInfo: {
    marginTop: 10,
    backgroundColor: 'rgba(66, 138,248,1)',
    borderRadius: 7,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
  collapsedContent: {
    paddingTop: 10,
  },
});


export default List;