import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDAnNO3N89vzUX1IJlJfUjolq1ejbKy3to",
    authDomain: "morningpages-43397.firebaseapp.com",
    databaseURL: "https://morningpages-43397-default-rtdb.firebaseio.com",
    projectId: "morningpages-43397",
    storageBucket: "morningpages-43397.appspot.com",
    messagingSenderId: "813075093364",
    appId: "1:813075093364:web:b74507dfebd142f6c83e21"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;