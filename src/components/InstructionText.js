// src/components/InstructionText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const InstructionText = ({ children }) => {
  return <Text style={styles.instruction}>{children}</Text>;
};

const styles = StyleSheet.create({
  instruction: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#6c757d',
  },
});

export default InstructionText;
