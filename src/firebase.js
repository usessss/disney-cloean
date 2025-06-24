// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH-oMTWG6t47SF08Oea_rOJba--1ArG3s",
  authDomain: "react-disney-test-b59ec.firebaseapp.com",
  projectId: "react-disney-test-b59ec",
  storageBucket: "react-disney-test-b59ec.firebasestorage.app",
  messagingSenderId: "1010156075991",
  appId: "1:1010156075991:web:7ade920be9af422407a992"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Firebase 앱 초기화

// 외부에서도 app 사용할거니까 내보내기
export default app;