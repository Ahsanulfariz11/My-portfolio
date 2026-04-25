/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import defaultData from './data.json';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b5f21a4f55bbb4a7d77fa3d3b924fb426af8f1d5
import { database } from './firebase';
import { ref, set, onValue } from 'firebase/database';

const STORAGE_KEY = 'portfolio_data';
const DB_REF = ref(database, 'portfolio');

// Increment this number every time you update data.json and want to force-push to Firebase
const DATA_VERSION = 2;
const VERSION_REF = ref(database, 'data_version');

export function useData() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD

  useEffect(() => {
    // First, check the version in Firebase
    onValue(VERSION_REF, async (versionSnap) => {
      const remoteVersion = versionSnap.val();

      if (remoteVersion === null || remoteVersion < DATA_VERSION) {
        // Force push new data to Firebase (overwrite old/dummy data)
        console.log('🔄 Data version mismatch. Pushing new data...');
        try {
          await set(DB_REF, defaultData);
          await set(VERSION_REF, DATA_VERSION);
          setData(defaultData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
          localStorage.setItem('data_version', DATA_VERSION);
          console.log('✅ New data pushed to Firebase! Version:', DATA_VERSION);
        } catch (err) {
          console.error('❌ Error pushing new data:', err);
        }
        setLoading(false);
      }
    }, { onlyOnce: true });

    // Then listen for realtime updates
    const unsubscribe = onValue(DB_REF, (snapshot) => {
      if (snapshot.exists()) {
        const firebaseData = snapshot.val();
        setData(firebaseData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(firebaseData));
        console.log('✅ Data synced from Firebase!');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveData = async (newData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    try {
      await set(DB_REF, newData);
      console.log('✅ Saved to Firebase!');
    } catch (error) {
      console.error('❌ Error saving to Firebase:', error);
      alert('Gagal menyimpan ke database.');
=======

  useEffect(() => {
    // First, check the version in Firebase
    onValue(VERSION_REF, async (versionSnap) => {
      const remoteVersion = versionSnap.val();

      if (remoteVersion === null || remoteVersion < DATA_VERSION) {
        // Force push new data to Firebase (overwrite old/dummy data)
        console.log('🔄 Data version mismatch. Pushing new data...');
        try {
          await set(DB_REF, defaultData);
          await set(VERSION_REF, DATA_VERSION);
          setData(defaultData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
          localStorage.setItem('data_version', DATA_VERSION);
          console.log('✅ New data pushed to Firebase! Version:', DATA_VERSION);
        } catch (err) {
          console.error('❌ Error pushing new data:', err);
        }
        setLoading(false);
      }
    }, { onlyOnce: true });

    // Then listen for realtime updates
    const unsubscribe = onValue(DB_REF, (snapshot) => {
      if (snapshot.exists()) {
        const firebaseData = snapshot.val();
        setData(firebaseData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(firebaseData));
        console.log('✅ Data synced from Firebase!');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveData = async (newData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    try {
      await set(DB_REF, newData);
      console.log('✅ Saved to Firebase!');
    } catch (error) {
      console.error('❌ Error saving to Firebase:', error);
      alert('Gagal menyimpan ke database.');
=======
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const STORAGE_KEY = 'portfolio_data';
const DOC_REF = doc(db, 'portfolio', 'data');

export function useData() {
  // Use localStorage as initial state to prevent UI flicker while fetching
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored data:', e);
    }
    return defaultData;
  });

  // Fetch data from Firebase on mount
  useEffect(() => {
    const fetchFromFirebase = async () => {
      try {
        const docSnap = await getDoc(DOC_REF);
        if (docSnap.exists()) {
          const firestoreData = docSnap.data();
          setData(firestoreData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(firestoreData));
        } else {
          // If document doesn't exist yet, save current data to Firestore
          await setDoc(DOC_REF, data);
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchFromFirebase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveData = async (newData) => {
    // Update locally immediately for snappy UI
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

    // Persist to Firebase
    try {
      await setDoc(DOC_REF, newData);
      console.log('Saved to Firebase!');
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      alert('Gagal menyimpan ke database. Cek console.');
>>>>>>> 283d2c45ec94b375ff686056316e923c1b44a539
>>>>>>> b5f21a4f55bbb4a7d77fa3d3b924fb426af8f1d5
    }
  };

  const resetData = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
    try {
<<<<<<< HEAD
      await set(DB_REF, defaultData);
      console.log('🔄 Data reset to default!');
=======
<<<<<<< HEAD
      await set(DB_REF, defaultData);
      console.log('🔄 Data reset to default!');
=======
      await setDoc(DOC_REF, defaultData);
>>>>>>> 283d2c45ec94b375ff686056316e923c1b44a539
>>>>>>> b5f21a4f55bbb4a7d77fa3d3b924fb426af8f1d5
    } catch (error) {
      console.error('Error resetting Firebase:', error);
    }
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return { data, saveData, resetData, exportJSON, defaultData, loading };
}
