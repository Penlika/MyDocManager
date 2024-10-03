import { Amplify, API, Auth } from 'aws-amplify';
import awsconfig from '../aws-config';


Amplify.configure(awsconfig);


const getJwtToken = async () => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    return currentUser.signInUserSession.idToken.jwtToken;
  } catch (error) {
    console.error('Error fetching JWT token:', error);
    throw new Error('Unable to fetch JWT token');
  }
};


export const uploadDocument = async (file) => {
  try {
    const jwtToken = await getJwtToken();

    const fileName = `${Date.now()}_${file.fileName}`;
    const response = await API.post('DocumentsApi', '/documents', {
      headers: { Authorization: `Bearer ${jwtToken}` },
      body: {
        file: file.base64,
        fileName,
        contentType: file.type,
      },
    });

    console.log('Document uploaded successfully:', response);
    return response.fileName;
  } catch (error) {
    console.error('Document upload failed:', error);
    throw new Error('Document upload failed: ' + error.message);
  }
};


export const fetchDocuments = async () => {
  try {
    const jwtToken = await getJwtToken();

    const response = await API.get('DocumentsApi', '/documents', {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    console.log('Fetched documents:', response);


    if (!response || !response.documents || response.documents.length === 0) {
      console.log('No documents found for this user.');
      return [];
    }

    return response.documents;
  } catch (error) {
    console.error('Failed to load documents:', error);
    throw new Error('Failed to load documents: ' + error.message);
  }
};


export const deleteDocument = async (documentId) => {
  try {
    const jwtToken = await getJwtToken();

    const response = await API.del('DocumentsApi', `/documents/${documentId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    console.log('Document deleted successfully:', response);
    return response;
  } catch (error) {
    console.error('Document deletion failed:', error);
    throw new Error('Document deletion failed: ' + error.message);
  }
};


export const fetchDocument = async (documentId) => {
  try {
    const jwtToken = await getJwtToken();

    const response = await API.get('DocumentsApi', `/documents/${documentId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    console.log('Fetched document:', response);
    return response.file;
  } catch (error) {
    console.error('Failed to fetch document:', error);
    throw new Error('Failed to fetch document: ' + error.message);
  }
};


export const getDocumentUrl = (s3Key) => {
  return `https://mydocumentspit.s3.amazonaws.com/${s3Key}`;
};
