import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { WHITE } from '../constants/colors';

const Button = ({
  label,
  onPress
}) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(66, 138,248,1)',
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)"
  },
  text: {
    color: `${WHITE}`,
    textAlign: "center",
    height: 20
  }
});

export default Button;