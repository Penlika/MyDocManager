// src/components/DocumentList.js
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import DocumentCard from './DocumentCard';

const DocumentList = ({ documents, onDocumentPress }) => {
  const renderItem = ({ item }) => (
    <DocumentCard title={item.title} onPress={() => onDocumentPress(item.id)} />
  );

  return (
    <FlatList
      data={documents}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 15,
  },
});

export default DocumentList;
