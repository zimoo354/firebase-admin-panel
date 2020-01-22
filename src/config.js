import React from 'react'
import Firebase from 'firebase'

export const MapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_APIKEY;

export const firebase = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

/**
* This `AuthApp` is just used to create users
* 
* Found here:
* https://stackoverflow.com/questions/37517208/firebase-kicks-out-current-user
*/

export const AuthApp = Firebase.initializeApp(firebase, "Auth");
