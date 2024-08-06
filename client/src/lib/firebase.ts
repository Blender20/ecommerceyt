// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyADpC8uYhI-0DvA0NnexNRe3ucbYdhny3I',
  authDomain: 'hippo-labels-877c9.firebaseapp.com',
  projectId: 'hippo-labels-877c9',
  storageBucket: 'hippo-labels-877c9.appspot.com',
  messagingSenderId: '198732137412',
  appId: '1:198732137412:web:b19287b90e80a11375da91',
  measurementId: 'G-P913803Y27',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
