import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDiwA7Dwmm3LyN9zG-FT0_7yoz-BSvvuE4",
    authDomain: "olx-clone-fe192.firebaseapp.com",
    projectId: "olx-clone-fe192",
    storageBucket: "olx-clone-fe192.appspot.com",
    messagingSenderId: "915026073184",
    appId: "1:915026073184:web:a29071a9c811706b319505",
    measurementId: "G-DVP8704BZT"
  };

  
    
  const firebaseApp = initializeApp(firebaseConfig);
  const OLXdb = getFirestore(firebaseApp);
  
  export default OLXdb;
  