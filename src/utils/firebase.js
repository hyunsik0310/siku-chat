import { createdAt } from 'expo-updates';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import config from '../../firebase.json';

export const app = initializeApp(config);

const auth = getAuth();

export const login = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

const uploadImage = async (uri) => {
  if (uri.startsWith('https')) {
    return uri;
  }

  const response = await fetch(uri);
  const blob = await response.blob();

  const { uid } = auth.currentUser;
  const storage = getStorage(app);
  const storageRef = ref(storage, `/profile/${uid}/photo.png`);
  await uploadBytes(storageRef, blob, {
    contentType: 'image/png',
  });

  return await getDownloadURL(storageRef);
};

export const signup = async ({ name, email, password, photoUrl }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const photoURL = await uploadImage(photoUrl);

  await updateProfile(auth.currentUser, { displayName: name, photoURL });
  await createUserInfo2(auth.currentUser, name, email);
  return user;
};

export const createUserInfo = async (user, { name, email }) => {
  const userInfoCollection = collection(db, 'userInfo');
  const userInfoRef = doc(userInfoCollection);
  const { uid } = user;
  const authority = '0';
  const newInfo = {
    uid,
    name,
    email,
    authority,
    createdAt: Date.now(),
  };
  await setDoc(userInfoRef, newInfo);
  return id;
};

export const createUserInfo2 = async (user, { name, email }) => {
  const userInfoCollection = collection(db, 'userInfo');
  const userInfoRef = doc(userInfoCollection);
  const { uid } = user;

  await setDoc(doc(userInfoRef, uid), {
    name: name,
    email: email,
    team: 'team1',
    flg: true,
  });
};
export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = auth.currentUser;
  return { uid, name: displayName, email, photoUrl: photoURL };
};

export const updateUserPhoto = async (photo) => {
  const photoUrl = await uploadImage(photo);
  await updateProfile(auth.currentUser, { photoUrl });
  return photoUrl;
};

export const logout = async () => {
  await signOut(auth);
  return {};
};

const db = getFirestore(app);

export const createChannel = async ({ title, description }) => {
  const channelCollection = collection(db, 'channels');
  const newChannelRef = doc(channelCollection);
  const id = newChannelRef.id;
  const newChannel = {
    id,
    title,
    description,
    createdAt: Date.now(),
  };
  await setDoc(newChannelRef, newChannel);
  return id;
};

export const createMessage = async ({ channelId, message }) => {
  const docRef = doc(db, `channels/${channelId}/messages`, message._id);
  const docChannelRef = doc(db, `channels/${channelId}/`);
  await updateDoc(docChannelRef, { createdAt: Date.now() });
  await setDoc(docRef, { ...message, createdAt: Date.now() });
};

export const updateChannelDate = async () => {
  const docChannelRef = doc(db, `channels`);
  await updateDoc(docChannelRef, { createdAt: Date.now() });
};
