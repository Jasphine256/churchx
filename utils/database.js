import { db } from "./firebase";
import { collection, doc, addDoc, getDoc, getDocs , updateDoc, deleteDoc} from "firebase/firestore";
import { query, where } from "firebase/firestore";

// Function to add a document
export const addDocument = async (collection_name, object) => {
  try {
    const docRef = await addDoc(collection(db, collection_name),object)
    console.log("__________________________________________")
    console.log('Document successfully added!');
    console.log("__________________________________________")

  } catch (error) {
    console.log("__________________________________________")
    console.error('Error adding document: ', error);
    console.log("__________________________________________")

  }
};


// Function to fetch a single document
export const getUser = async (collection_name, email) => {
  try {
      const q = query(collection(
        db,
        collection_name),
        where("email", "==", ''+email+'')
      );

      const docSnap = await getDocs(q);
      if (docSnap.empty) {
          return false
      }      
      return docSnap
  } catch (error) {
    console.error('Error getting document:', error);
  }
};


export const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return true
  } catch (e) {
    console.log("__________________________________________")
    console.error("Error adding document: ", e);
    console.log("__________________________________________")
  }
};


export const readDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return documents;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return [];
  }
};


export const readDocumentById = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    return null;
  }
};


export const readDocumentByField = async (collectionName, fieldName, value) => {
  try {
    
    // Create a query against the collection
    const q = query(collection(db, collectionName), where(fieldName, "==", ''+value+''));
    
    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if any documents were found
    if (querySnapshot.empty) {
      console.log("No matching documents found.");
      return []; // Return null if no documents match the query
    }

    // Assuming that you only expect one document
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Return the first document if multiple documents are returned
    return documents;

  } catch (e) {
    console.error("Error getting documents: ", e);
    return null; // Return null in case of an error
  }
};


export const updateDocument = async (collectionName, docId, updatedData) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
    return { success: true, message: "Document updated successfully." };
  } catch (e) {
    console.error("Error updating document: ", e);
    return { success: false, message: "Error updating document." };
  }
};

// Update a Firestore document by email
export const updateDocumentByEmail = async (collectionName, email, newData) => {
    try {
        // Query the collection to find the document with the matching email
        const q = query(collection(db, collectionName), where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log('No matching documents found for email:', email);
            return;
        }

        // Loop through query results and update the document
        querySnapshot.forEach(async (docSnapshot) => {
            const docRef = doc(db, collectionName, docSnapshot.id);

            // Update the document with the new data
            await updateDoc(docRef, newData);
            console.log('Document updated successfully for email:', email);
        });
    } catch (error) {
        console.error('Error updating document:', error);
    }
}


export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return { success: true, message: "Document deleted successfully." };
  } catch (e) {
    console.error("Error deleting document: ", e);
    return { success: false, message: "Error deleting document." };
  }
};
