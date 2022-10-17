// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnBruJo20rmW-bucvDhazY9jpvaC9TB7A",
  authDomain: "activity-management-63f37.firebaseapp.com",
  projectId: "activity-management-63f37",
  storageBucket: "activity-management-63f37.appspot.com",
  messagingSenderId: "646526387852",
  appId: "1:646526387852:web:152520a513f97701509da9",
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
