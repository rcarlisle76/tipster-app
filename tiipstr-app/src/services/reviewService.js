import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Create a new review
export const createReview = async (userId, username, placeName, rating, comment) => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const newReview = await addDoc(reviewsRef, {
      userId,
      username,
      placeName,
      rating,
      comment,
      createdAt: serverTimestamp(),
    });

    return newReview.id;
  } catch (error) {
    console.error('Create review error:', error);
    throw error;
  }
};

// Get reviews for a specific user
export const getUserReviews = async (userId) => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(
      reviewsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ reviewId: doc.id, ...doc.data() });
    });

    return reviews;
  } catch (error) {
    console.error('Get user reviews error:', error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  try {
    await deleteDoc(doc(db, 'reviews', reviewId));
  } catch (error) {
    console.error('Delete review error:', error);
    throw error;
  }
};

// Get reviews for a specific place
export const getPlaceReviews = async (placeName) => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(
      reviewsRef,
      where('placeName', '==', placeName),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ reviewId: doc.id, ...doc.data() });
    });

    return reviews;
  } catch (error) {
    console.error('Get place reviews error:', error);
    throw error;
  }
};
