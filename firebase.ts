import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBojKti6UFKD0MA4rpMOGlwJZBDt324Or8",
  authDomain: "ibeacon-app-browser.firebaseapp.com",
  projectId: "ibeacon-app-browser",
  storageBucket: "ibeacon-app-browser.appspot.com",
  messagingSenderId: "454663927503",
  appId: "1:454663927503:web:a571d2ca5945ebeb3e69ba",
  measurementId: "G-39GFK0HQXB"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
