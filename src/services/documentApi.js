import { API } from 'aws-amplify';
import { API_BASE_URL } from '../config'; // Update the path if needed

// Fetch all documents
export const loadDocuments = async () => {
  try {
    const response = await API.get('DocumentsApi', '/documents', {});
    return response; // Return the documents data
  } catch (error) {
    throw new Error('Error fetching documents');
  }
};

// Fetch a specific document by ID
export const loadDocumentById = async (documentId) => {
  try {
    const response = await API.get('DocumentsApi', `/documents/${documentId}`, {});
    return response; // Return the specific document data
  } catch (error) {
    throw new Error('Error fetching document');
  }
};

// Upload a document
export const uploadDocument = async (documentData) => {
  try {
    const response = await API.post('DocumentsApi', '/documents', { body: documentData });
    return response; // Return the result of the upload
  } catch (error) {
    throw new Error('Error uploading document');
  }
};
