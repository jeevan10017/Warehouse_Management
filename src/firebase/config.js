import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDS3N2tQxJyqNiJd2m2qUI6hoFxcrOjkxA", 
  authDomain: "warehouse-management-jeevs.firebaseapp.com",
  projectId: "warehouse-management-jeevs",
  storageBucket: "warehouse-management-jeevs.appspot.com",
  messagingSenderId: "1003032067991",
  appId: "1:1003032067991:web:7edc011b9ecba42de10ed2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
