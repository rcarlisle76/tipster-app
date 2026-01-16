import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Get user profile by userId
export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { userId: userDoc.id, ...userDoc.data() };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, data) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, data);
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
};

// Search users by username or display name
export const searchUsers = async (searchQuery) => {
  try {
    const usersRef = collection(db, 'users');

    // Search by username (case-sensitive for now)
    // Note: For production, consider using Algolia or similar for better search
    const q = query(
      usersRef,
      where('username', '>=', searchQuery),
      where('username', '<=', searchQuery + '\uf8ff'),
      limit(20)
    );

    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ userId: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    console.error('Search users error:', error);
    throw error;
  }
};

// Search companies (accounts with accountType = 'company')
export const searchCompanies = async (searchQuery) => {
  try {
    const usersRef = collection(db, 'users');

    // Search for company accounts by username
    const q = query(
      usersRef,
      where('accountType', '==', 'company'),
      where('username', '>=', searchQuery),
      where('username', '<=', searchQuery + '\uf8ff'),
      limit(20)
    );

    const querySnapshot = await getDocs(q);
    const companies = [];
    querySnapshot.forEach((doc) => {
      companies.push({ userId: doc.id, ...doc.data() });
    });

    return companies;
  } catch (error) {
    console.error('Search companies error:', error);
    throw error;
  }
};

// Check if username is available
export const isUsernameAvailable = async (username) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username), limit(1));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  } catch (error) {
    console.error('Check username error:', error);
    throw error;
  }
};
