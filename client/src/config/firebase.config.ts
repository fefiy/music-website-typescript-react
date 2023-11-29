import { initializeApp, getApp, getApps } from "firebase/app";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyB152oSzxiPGLennKAIhJvDnLpTD7Jx6ck",
    authDomain: "audio-store-686d3.firebaseapp.com",
    databaseURL: "https://audio-store-686d3-default-rtdb.firebaseio.com",
    projectId: "audio-store-686d3",
    storageBucket: "audio-store-686d3.appspot.com",
    messagingSenderId: "701321730506",
    appId: "1:701321730506:web:7fce235991dfe2d2af9733",
    measurementId: "G-JJLKV5YWQ8"
  };
  export const app = getApps().length > 0? getApp() : initializeApp(firebaseConfig)
 export  const storage = getStorage(app)