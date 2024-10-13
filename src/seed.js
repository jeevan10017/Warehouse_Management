const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyDS3N2tQxJyqNiJd2m2qUI6hoFxcrOjkxA", 
    authDomain: "warehouse-management-jeevs.firebaseapp.com",
    projectId: "warehouse-management-jeevs",
    storageBucket: "warehouse-management-jeevs.appspot.com",
    messagingSenderId: "1003032067991",
    appId: "1:1003032067991:web:7edc011b9ecba42de10ed2"
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

    const email = 'jeevan@admin.com';
    const password = 'Jeevs@123';
    await createUserWithEmailAndPassword(auth, email, password);
    console.log(`Created admin user: ${email}`);

  } catch (error) {
    console.error("Error seeding data: ", error);
  }
};

seedData();
