import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const DocumentCard = ({ document, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card} accessible={true} accessibilityLabel={`Open document ${document.title}`}>
      {document.thumbnail ? (
        <Image source={{ uri: document.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={styles.placeholderThumbnail} />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{document.title || 'Untitled'}</Text>
        <Text style={styles.type}>{document.type || 'Unknown Type'}</Text>
        <Text style={styles.modified}>{document.lastModified || 'No date available'}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Prop Types validation
DocumentCard.propTypes = {
  document: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    type: PropTypes.string,
    lastModified: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  placeholderThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  type: {
    color: '#555',
  },
  modified: {
    color: '#999',
  },
});

export default DocumentCard;
