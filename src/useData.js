import { useState, useEffect } from 'react';
import defaultData from './data.json';
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
    }
  };

  const resetData = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
    try {
      await setDoc(DOC_REF, defaultData);
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

  return { data, saveData, resetData, exportJSON, defaultData };
}
