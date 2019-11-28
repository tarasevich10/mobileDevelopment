import React from 'react';
import { View, TextInput,Text, StyleSheet } from 'react-native';
import { WHITE } from '../constants/colors';

const InputText = ({
  name,
  value,
  onChange,
  label,
  withValidation = false,
  errorMessage,
  isPassword = false
}) => (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        style={styles.input}
        onChangeText={onChange}
        placeholderTextColor={WHITE}
        secureTextEntry={isPassword}
      />
      {withValidation && errorMessage ?
        <Text style={styles.error}>{errorMessage}</Text> :
        null
      }
    </View>
  );


const styles = StyleSheet.create({
  label: {
    color: `${WHITE}`
  },
  input: {
    height: 40,
    borderColor: 'rgba(255,255,255,0.6)',
    color: `${WHITE}`,
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  error: {
    color: "red",
    textDecorationLine: "underline",
    marginLeft: 10,
    marginBottom: 10
  },
});

export default InputText;