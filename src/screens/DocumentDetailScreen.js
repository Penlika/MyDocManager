import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Storage } from 'aws-amplify';
import { downloadDocument } from '../services/documentService';

const DocumentDetailScreen = ({ route }) => {
  const { document } = route.params;
  const [downloadLink, setDownloadLink] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      const fileUrl = await downloadDocument(document.key);
      setDownloadLink(fileUrl);
    };

    fetchDocument();
  }, []);

  const handleDownload = () => {
  };

  return (
    <View style={styles.container}>
      <Text>{document.title}</Text>
      {downloadLink && <Button title="Download" onPress={handleDownload} />}
    </View>
  );
};

export default DocumentDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
import { deleteDocument } from '../services/documentService';
export const updateDocumentMetadata = async (documentId, updatedData) => {
  const params = {
    TableName: 'DocumentsTable',
    Key: { id: { S: documentId } },
    UpdateExpression: 'set title = :t, tags = :tags',
    ExpressionAttributeValues: {
      ':t': { S: updatedData.title },
      ':tags': { S: updatedData.tags },
    },
  };

  try {
    await DynamoDB.updateItem(params).promise();
    console.log('Metadata updated successfully');
  } catch (error) {
    console.error('Error updating metadata:', error);
  }
};

const handleDelete = async () => {
  await deleteDocument(document.key);
};
