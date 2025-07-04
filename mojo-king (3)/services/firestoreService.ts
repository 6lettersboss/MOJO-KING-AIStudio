import { db } from '../firebase/config';
import { UserProfile } from '../types';

const USERS_COLLECTION = 'users';

/**
 * Saves or updates a user's profile in the Firestore database.
 * @param uid The user's unique ID from Firebase Auth.
 * @param profile The user profile data to save.
 */
export const saveUserProfile = async (uid: string, profile: UserProfile): Promise<void> => {
  try {
    const userDocRef = db.collection(USERS_COLLECTION).doc(uid);
    // Using set with merge: true to allow for updating fields without overwriting the whole document
    // and to create it if it doesn't exist.
    await userDocRef.set(profile, { merge: true });
  } catch (error) {
    console.error("Error saving user profile to Firestore:", error);
    throw new Error("Failed to save profile data.");
  }
};