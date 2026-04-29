import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

function isValid(val: string | undefined): boolean {
  return typeof val === 'string' && val !== "" && val !== "undefined" && val !== "null" && !val.includes("YOUR_") && !val.includes("MY_");
}

// Environment variables take precedence over the config file for public repositories
export const config = {
  apiKey: isValid(import.meta.env.VITE_FIREBASE_API_KEY) ? import.meta.env.VITE_FIREBASE_API_KEY : firebaseConfig.apiKey,
  authDomain: isValid(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN : firebaseConfig.authDomain,
  projectId: isValid(import.meta.env.VITE_FIREBASE_PROJECT_ID) ? import.meta.env.VITE_FIREBASE_PROJECT_ID : firebaseConfig.projectId,
  storageBucket: isValid(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) ? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET : firebaseConfig.storageBucket,
  messagingSenderId: isValid(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID : firebaseConfig.messagingSenderId,
  appId: isValid(import.meta.env.VITE_FIREBASE_APP_ID) ? import.meta.env.VITE_FIREBASE_APP_ID : firebaseConfig.appId,
  firestoreDatabaseId: isValid(import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID) ? import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID : firebaseConfig.firestoreDatabaseId,
  measurementId: isValid(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) ? import.meta.env.VITE_FIREBASE_MEASUREMENT_ID : firebaseConfig.measurementId,
};

// Initialize Firebase App
const app = getApps().length > 0 
  ? getApp() 
  : initializeApp(config);

// Initialize Services
// Use default database if firestoreDatabaseId is not provided or invalid
export const db = getFirestore(app, config.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
