import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import DocumentCard from '../components/DocumentCard'; 
import { fetchDocuments, uploadDocument, deleteDocument, getDocumentUrl } from '../services/documentService';
import { launchImageLibrary } from 'react-native-image-picker';

const DashboardScreen = () => {
  const [documents, setDocuments] = useState([]);
  const [isFabOpen, setFabOpen] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docsResponse = await fetchDocuments();
      if (Array.isArray(docsResponse)) {
        setDocuments(docsResponse);
      } else {
        Alert.alert('Error', 'No documents found.');
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
      Alert.alert('Error', 'Failed to load documents. Please try again later.');
    }
  };

  const handleUpload = async () => {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      includeBase64: true,
      selectionLimit: 1,
    });
  
    if (!result.didCancel && result.assets) {
      const file = result.assets[0];
      const fileData = {
        fileName: file.fileName || 'Untitled',
        base64: file.base64,
        type: file.type || 'application/octet-stream',
      };
  
      try {
        await uploadDocument(fileData);
        Alert.alert('Upload Successful', 'Your file has been uploaded successfully.');
        loadDocuments();
      } catch (error) {
        Alert.alert('Upload Failed', error.message || 'An error occurred during upload.');
      }
    }
  };

  const handleDelete = async (documentId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: async () => {
          try {
            await deleteDocument(documentId);
            Alert.alert('Delete Successful', 'Your document has been deleted successfully.');
            loadDocuments();
          } catch (error) {
            Alert.alert('Delete Failed', error.message || 'An error occurred during deletion.');
          }
        }},
      ]
    );
  };

  const renderDocumentCard = (item) => {
    const isBase64Image = item.thumbnailUrl && item.thumbnailUrl.startsWith('data:image/');
    
    return (
      <DocumentCard
        document={{
          title: item.FileName || 'Untitled',
          thumbnail: isBase64Image ? item.thumbnailUrl : getDocumentUrl(item.DocumentID),
          type: item.contentType || 'application/octet-stream',
          lastModified: item.UploadDate || new Date().toISOString(),
        }}
        onDelete={() => handleDelete(item.DocumentID)}
        onPress={() => console.log(`Pressed document: ${item.FileName}`)}
      />
    );
  };

  const renderDocumentGrid = () => {
    const rows = [];
    for (let i = 0; i < documents.length; i += 2) {
      rows.push(
        <View key={i} style={styles.row}>
          <View style={styles.column}>
            {renderDocumentCard(documents[i])}
          </View>
          <View style={styles.column}>
            {documents[i + 1] ? renderDocumentCard(documents[i + 1]) : <View style={styles.emptyColumn} />}
          </View>
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Drive</Text>
        <Image style={styles.profileImage} source={{ uri: 'https://example.com/user-profile.jpg' }} />
      </View>

      {documents.length > 0 ? (
        <View style={styles.documentList}>
          {renderDocumentGrid()}
        </View>
      ) : (
        <Text style={styles.noDocuments}>No documents found.</Text>
      )}

      <FAB.Group
        open={isFabOpen}
        icon={isFabOpen ? 'close' : 'plus'}
        actions={[
          { icon: 'folder', label: 'Folder', onPress: () => console.log('Pressed Folder') },
          { icon: 'upload', label: 'Upload', onPress: handleUpload },
          { icon: 'camera', label: 'Camera', onPress: () => console.log('Pressed Camera') },
        ]}
        onStateChange={() => setFabOpen(!isFabOpen)}
        style={styles.fab}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  documentList: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  emptyColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    height: 120,
  },
  noDocuments: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888888',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default DashboardScreen;
