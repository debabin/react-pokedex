import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCrIh632DOdRjTu-3tL227XRYqP3BS-wFs',
  authDomain: 'pokedex-front-react.firebaseapp.com',
  projectId: 'pokedex-front-react',
  storageBucket: 'pokedex-front-react.appspot.com',
  messagingSenderId: '557743767549',
  appId: '1:557743767549:web:6466f72d3df1483644e394',
  measurementId: 'G-HYLCWZME96'
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export type Collection = 'pokemons' | 'users';
export const database = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
