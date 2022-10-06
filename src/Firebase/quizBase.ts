import { initializeApp } from "firebase/app";
import { getFirestore, Firestore, collection, getDocs } from 'firebase/firestore/lite';

const {
    REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID
} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp)

export async function getQuiz(db: Firestore, collectionName: string) {
  const quizCollection = collection(db, collectionName)
  const documents = await getDocs(quizCollection)
  return documents.docs.map(doc => doc.data())
}
