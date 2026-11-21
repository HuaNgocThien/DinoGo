import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  deleteUser,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  FieldValue,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "./fireBaseConfig";
import { UserDoc } from "../types";
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

type CreateUserPayload = Omit<UserDoc, "createdAt"> & {
  createdAt: FieldValue;
};
//Services Signatures
//Sign Up
export const signUp = async ({
  email,
  password,
  fullName,
  phoneNumber,
}: SignUpParams): Promise<UserDoc> => {
  const cleanEmail = email.toLowerCase().trim();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    cleanEmail,
    password,
  );
  const firebaseUser = userCredential.user;

  const baseProfile = {
    id: firebaseUser.uid,
    email: cleanEmail,
    fullName: fullName.trim(),
    phoneNumber: phoneNumber?.trim() || "",
    role: "user" as const,
  };
  const payload: CreateUserPayload = {
    ...baseProfile,
    createdAt: serverTimestamp(),
  };

  try {
    const userDocRef = doc(db, "users", firebaseUser.uid);
    await setDoc(userDocRef, payload);

    return {
      ...baseProfile,
      createdAt: Timestamp.now(),
    };
  } catch (firestoreError) {
    await deleteUser(firebaseUser);
    throw firestoreError;
  }
};
//Get User Profile
export const getUserProfile = async (
  userId: string,
): Promise<UserDoc | null> => {
  const userDocRef = doc(db, "users", userId);
  const docSnap = await getDoc(userDocRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data() as UserDoc;
};
//Sign In
export const signIn = async ({
  email,
  password,
}: SignInParams): Promise<UserDoc> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );
  const userProfile = await getUserProfile(userCredential.user.uid);
  if (!userProfile) {
    throw new Error("Không tìm thấy dữ liệu hồ sơ người dùng.");
  }
  return userProfile;
};
//Sign Out
export const signOutUser = async (): Promise<void> => {
  await firebaseSignOut(auth);
};
