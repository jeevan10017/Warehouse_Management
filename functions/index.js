const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Fetch locations with parent_godown filter
app.get('/locations', async (req, res) => {
  const { parent_godown } = req.query;

  try {
    let locationsRef = db.collection('locations');

    // If parent_godown is provided, fetch child locations
    if (parent_godown) {
      locationsRef = locationsRef.where('parent_godown', '==', parent_godown);
    } else {
      // Fetch root locations (where parent_godown is null)
      locationsRef = locationsRef.where('parent_godown', '==', null);
    }

    const snapshot = await locationsRef.get();
    const locations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Error fetching locations' });
  }
});

// Fetch items for a specific godown (location)
app.get('/items', async (req, res) => {
  const { godown_id } = req.query; // Get godown_id from query parameters

  try {
    const itemsRef = db.collection('items').where('godown_id', '==', godown_id);
    const snapshot = await itemsRef.get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Error fetching items' });
  }
});

// Expose the Express API as a Firebase Function
exports.api = functions.https.onRequest(app);
