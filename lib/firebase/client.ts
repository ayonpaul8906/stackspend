import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase safely
const app = (!firebaseConfig.projectId) 
  ? null 
  : (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig));

// Initialize Firestore with long polling to prevent GRPC hang in Next.js Server Components
let db: unknown = null;
if (app) {
  try {
    db = initializeFirestore(app, { experimentalForceLongPolling: true });
  } catch {
    // If already initialized (during Next.js fast refresh)
    db = getFirestore(app);
  }
}

export { app, db };
