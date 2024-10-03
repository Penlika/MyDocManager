import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { shareDocument } from '../services/documentService';

const ShareScreen = () => {
  const [documentId, setDocumentId] = useState('');
  const [userId, setUserId] = useState('');

  const handleShare = async () => {
    try {
      await shareDocument(documentId, userId);
      Alert.alert('Success', 'Document shared successfully!');
    } catch (error) {
      Alert.alert('Error', 'Could not share the document.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share Document</Text>
      <TextInput
        style={styles.input}
        placeholder="Document ID"
        value={documentId}
        onChangeText={setDocumentId}
      />
      <TextInput
        style={styles.input}
        placeholder="User Account ID or Email"
        value={userId}
        onChangeText={setUserId}
      />
      <Button title="Share" onPress={handleShare} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ShareScreen;
