import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDdAUSVOvbZ3XMI3nfXxsw5NOlVLVbucAk",
  authDomain: "random-team-generator-app.firebaseapp.com",
  projectId: "random-team-generator-app",
  storageBucket: "random-team-generator-app.appspot.com",
  messagingSenderId: "118348318648",
  appId: "1:118348318648:web:dc7cc6a8cc10714dc1314d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let analytics;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, db, analytics };