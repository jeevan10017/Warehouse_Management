const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


const readJSONFile = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  };

const seedData = async () => {
  try {

    const locations = readJSONFile('./data/locations.json');
    const items = readJSONFile('data/items.json');

    for (const loc of locations) {
      await addDoc(collection(db, 'locations'), loc);
      console.log(`Added location: ${loc.name}`);
    }

    for (const item of items) {
      await addDoc(collection(db, 'items'), item);
      console.log(`Added item: ${item.name}`);
    }

    const email = 'user@admin.com';
    const password = 'user@123';
    await createUserWithEmailAndPassword(auth, email, password);
    console.log(`Created admin user: ${email}`);

  } catch (error) {
    console.error("Error seeding data: ", error);
  }
};

seedData();
