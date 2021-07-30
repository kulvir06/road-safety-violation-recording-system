import firebase from 'firebase/app';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDK53Qu3U4_Ok2R5SpwpcpuVStvHq45OAg",
    authDomain: "fir-react-upload-45c4f.firebaseapp.com",
    projectId: "fir-react-upload-45c4f",
    storageBucket: "fir-react-upload-45c4f.appspot.com",
    messagingSenderId: "70025084606",
    appId: "1:70025084606:web:cfad38249fb71752bf28ef",
    measurementId: "G-DQ1Z7XJZES"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };