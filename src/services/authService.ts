import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  deleteUser,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./fireBaseConfig";
import { User } from "../types";

export interface SignUpParams {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

//Services Signatures
//Sign Up
export const signUp = async ({
  email,
  password,
  fullName,
  phoneNumber,
}: SignUpParams): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const firebaseUser = userCredential.user;

  const newUserProfile: User = {
    id: firebaseUser.uid,
    email: email.toLowerCase().trim(),
    fullName: fullName.trim(),
    phoneNumber: phoneNumber?.trim() || "",
    role: "user",
    createdAt: new Date().toISOString(),
  };

  try {
    const userDocRef = doc(db, "users", firebaseUser.uid);
    await setDoc(userDocRef, newUserProfile);

    return newUserProfile;
  } catch (firestoreError) {
    await deleteUser(firebaseUser);
    throw firestoreError;
  }
};
//Sign In
export const signIn = async ({
  email,
  password,
}: SignInParams): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );
  const { uid } = userCredential.user;

  const userDocRef = doc(db, "users", uid);
  const docSnap = await getDoc(userDocRef);

  if (!docSnap.exists()) {
    throw new Error("Không tìm thấy dữ liệu hồ sơ người dùng.");
  }

  return docSnap.data() as User;
};
//Sign Out
export const signOutUser = async (): Promise<void> => {
  await firebaseSignOut(auth);
};
