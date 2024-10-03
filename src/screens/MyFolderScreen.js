import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import DocumentCard from '../components/DocumentCard'; 
import { fetchUserDocuments } from '../services/documentService'; // Service to fetch user's documents

const MyFolderScreen = () => {
  const [userDocuments, setUserDocuments] = useState([]);

  useEffect(() => {
    const loadUserDocuments = async () => {
      const docs = await fetchUserDocuments(); // Fetch documents specific to the user
      setUserDocuments(docs);
    };
    loadUserDocuments();
  }, []);

  const renderDocumentCard = ({ item }) => (
    <DocumentCard
      document={{
        title: item.title,
        thumbnail: item.thumbnailUrl,
        type: item.type,
        lastModified: item.lastModified,
      }}
      onPress={() => console.log(`Pressed document: ${item.title}`)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Folder</Text>
      <FlatList
        data={userDocuments}
        renderItem={renderDocumentCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.documentList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  documentList: {
    flexGrow: 1,
  },
});

export default MyFolderScreen;
