// src/screens/UploadDocumentScreen.js
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { uploadDocument } from '../services/documentService';
import { invokeLambda } from '../services/lambdaService'; // Import invokeLambda

const UploadDocumentScreen = () => {
  const [documentKey, setDocumentKey] = useState(null);

  const handleDocumentUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        // Document Picker options
      });

      // Upload the document
      const key = await uploadDocument(res);
      setDocumentKey(key); // Save the document key for processing

      // Process the document with Lambda
      await handleDocumentProcessing(key);
    } catch (err) {
      console.error('Document upload failed:', err);
    }
  };

  // Function to process the document using Lambda
  const handleDocumentProcessing = async (documentKey) => {
    try {
      const result = await invokeLambda(documentKey);
      console.log('Document processed:', result);
    } catch (error) {
      console.error('Error processing document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Upload Document" onPress={handleDocumentUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UploadDocumentScreen;
