import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import firebase from '../../config/firebaseConfig';
import Button from "../components/Button";
import { MAIN_THEME } from "../constants/colors";
import InputText from "../components/InputText";
import { uploadImageToFirebase, uploadPhotoFromLibrary } from "../utils/imageUpload";

const Profile = () => {
  const [isViewMode, setIsViewMode] = useState(true);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [photoPath, setPhotoPath] = useState(null);

  useEffect(() => {
    const user = firebase.auth().currentUser;

    setUsername(user.displayName ? user.displayName : 'No name');
    setEmail(user.email);
    setPhotoPath(user.photoURL);
  }, []);

  const goToEditMode = () => setIsViewMode(!isViewMode);

  const uploadingPhoto = () => {
    uploadPhotoFromLibrary()
      .then(photo =>
        uploadImageToFirebase(photo.uri, "image/jpeg", photo.fileName),
      )
      .then(resultURL =>
        firebase.auth().currentUser.updateProfile({
          photoURL: resultURL,
        }),
      )
      .then(() => {
        setPhotoPath(firebase.auth().currentUser.photoURL);
      })
      .catch((e) => {
        alert(e)
      });
  };

  const handleSaveProfile = () => {
    firebase.auth().currentUser.updateEmail(email);
    firebase.auth().currentUser.updateProfile({ displayName: username });
    setIsViewMode(true);
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {isViewMode ? (
          <React.Fragment>
            <Image
              source={{ uri: photoPath }}
              style={styles.avatar}
            />
            <Text style={styles.title}>{username}</Text>
            <Text style={styles.subtitle}>{email}</Text>
          </React.Fragment>
        ) : (
            <React.Fragment>
              <View style={styles.form}>
                <TouchableWithoutFeedback onPress={uploadingPhoto}>
                  <View>
                    <Image
                      source={{ uri: photoPath }}
                      style={styles.avatar}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <InputText
                  name="username"
                  value={username}
                  onChange={setUsername}
                />
                <InputText
                  name="email"
                  value={email}
                  onChange={setEmail}
                />
              </View>
            </React.Fragment>
          )}
      </View>
      <Button
        label={isViewMode ? "Edit profile" : "Save changes"}
        onPress={
          isViewMode ? goToEditMode : handleSaveProfile
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({

  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  },
  background: {
    flex: 1,
    backgroundColor: `${MAIN_THEME}`,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "white",
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 20,
    color: "white",
  }
});

export default Profile;