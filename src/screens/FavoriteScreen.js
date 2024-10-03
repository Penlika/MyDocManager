// screens/FavoritesScreen.js

import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import DocumentCard from '../components/DocumentCard'; // Assuming this is your document card component
import { fetchFavoriteDocuments } from '../services/documentService'; // Adjust this import based on your services

const FavoriteScreen = () => {
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    const loadFavorites = async () => {
      const favs = await fetchFavoriteDocuments(); // Fetch your favorite documents
      setFavorites(favs);
    };
    loadFavorites();
  }, []);

  const renderDocumentCard = ({ item }) => (
    <DocumentCard
      document={{
        title: item.title,
        thumbnail: item.thumbnailUrl,
        type: item.type,
        lastModified: item.lastModified,
      }}
      onPress={() => console.log(`Pressed favorite document: ${item.title}`)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Favorites</Text>
      <FlatList
        data={favorites}
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
    padding: 16,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  documentList: {
    flexGrow: 1,
  },
});

export default FavoriteScreen;
