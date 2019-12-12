import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from 'react-navigation-hooks';
import InputText from "../components/InputText";
import Button from "../components/Button";
import API from "../utils/api"
import { LIST_PAGE } from "../constants/routes";
import { Snackbar } from "react-native-paper";
import { uploadImageToFirebase, uploadPhotoFromLibrary } from "../utils/imageUpload";
import { MAIN_THEME, ACTIVITY_INDICATOR } from "../constants/colors";

const AddingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarDialog, setSnackbarDialog] = useState(null);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [browserRequirements, setBrowserRequirements] = useState(null);
  const [userRegistration, setUserRegistration] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [image, setImage] = useState(null);

  const { navigate } = useNavigation();

  const handleBackPress = () => navigate(LIST_PAGE)

  const getErrorMessage = (field, fieldName, callback) => {
    if (!field) {
      callback(`${fieldName} is required`);
    }
  };

  const inputValidation = () => {
    const errors = {};

    getErrorMessage(name, "Name", message => {
      errors.name = message;
    });

    getErrorMessage(publisher, "Publisher", message => {
      errors.publisher = message;
    });

    getErrorMessage(browserRequirements, "Browser Requirements", message => {
      errors.browserRequirements = message;
    });

    getErrorMessage(userRegistration, "User Registration", message => {
      errors.userRegistration = message;
    });
    getErrorMessage(browserRequirements, "Browser Requirements", message => {
      errors.browserRequirements = message;
    });

    getErrorMessage(startDate, "Start Date", message => {
      errors.startDate = message;
    });

    return errors;
  };

  const uploadImage = () => {
    uploadPhotoFromLibrary()
      .then(photo => uploadImageToFirebase(photo.uri, "image/jpeg", photo.fileName))
      .then(url => setImage(url))
      .catch(error => setSnackbarDialog(error));
  };

  const handleSubmitPress = async () => {
    setErrors(inputValidation());

    if (Object.keys(inputValidation()).length !== 0) return;

    try {
      setIsLoading(true);

      const gameStatus = image;
      await API.post("panel", {
        name,
        publisher,
        browserRequirements,
        userRegistration,
        startDate,
        gameStatus,
      });

      navigate(LIST_PAGE);
    } catch ({ message }) {
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      <Appbar style={styles.appbar}>
        <Appbar.BackAction onPress={handleBackPress} />
        <Appbar.Content title="Game form" />
      </Appbar>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <InputText
            name="name"
            label="Name"
            value={name}
            onChange={setName}
            errorMessage={errors.name}
            withValidation={true}
          />
          <InputText
            name="publisher"
            label="Publisher"
            value={publisher}
            onChange={setPublisher}
            errorMessage={errors.publisher}
            withValidation={true}
          />
          <InputText
            name="Browser Requirements"
            label={"Browser Requirements"}
            value={browserRequirements}
            onChange={setBrowserRequirements}
            errorMessage={errors.browserRequirements}
            withValidation={true}
          />
          <InputText
            name="User Registration"
            label="User Registration"
            value={userRegistration}
            onChange={setUserRegistration}
            errorMessage={errors.userRegistration}
            withValidation={true}
          />
          <InputText
            name="Start Date"
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            errorMessage={errors.startDate}
            withValidation={true}
          />
          <Button label="Upload image" onPress={uploadImage} />
          {!!image && <Image style={{ width: 70, height: 100 }} source={{ uri: image }} />}
          <View style={styles.bottom}>
            {isLoading ? <ActivityIndicator color={ACTIVITY_INDICATOR} /> : <Button label="Submit" onPress={handleSubmitPress} />}
          </View>
        </View>
      </ScrollView>
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
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: `${MAIN_THEME}`,
  },
  appbar: {
    width: "100%",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: "5%"
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default AddingPage;