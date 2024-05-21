
// Importation des modules Firebase nécessaires
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Configuration de Firebase
const firebaseConfig = {
 
    apiKey: "AIzaSyDmXcUy_tlr8jaA6hM-I7lgk9sx-aYVHog",
    authDomain: "e-learning-a286c.firebaseapp.com",
    projectId: "e-learning-a286c",
    storageBucket: "e-learning-a286c.appspot.com",
    messagingSenderId: "68404486288",
    appId: "1:68404486288:web:5fcb761bf150dbaa353815",
    measurementId: "G-V6HHWYM1WT"
  
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Accès aux services de Firebase
const storage = getStorage(app);
const database = getDatabase(app);

// Export des services
export { storage, database };
