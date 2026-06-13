// Load Firebase from CDN global window.firebase to avoid disk space package install errors (ENOSPC)
const firebase = window.firebase;

const firebaseConfig = {
  apiKey: "AIzaSyBjWK145b-5_AD-kQ3GU3GE7ZD58RzGGKY",
  authDomain: "spreetail-1-1.firebaseapp.com",
  projectId: "spreetail-1-1",
  storageBucket: "spreetail-1-1.firebasestorage.app",
  messagingSenderId: "951537768684",
  appId: "1:951537768684:web:3252836a1f2598dd9dedc9"
};

// Initialize Firebase
let app;
if (firebase && firebase.apps && firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else if (firebase && firebase.app) {
  app = firebase.app();
}

export const auth = firebase ? firebase.auth() : null;
export const googleProvider = firebase ? new firebase.auth.GoogleAuthProvider() : null;
export const signInWithPopup = async (authInstance, providerInstance) => {
  if (!authInstance || !providerInstance) {
    throw new Error("Firebase SDK is not initialized correctly.");
  }
  return authInstance.signInWithPopup(providerInstance);
};
