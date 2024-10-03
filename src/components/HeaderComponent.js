// src/components/HeaderComponent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderComponent = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomColor: '#ced4da',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export default HeaderComponent;
