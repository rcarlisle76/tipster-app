import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Follow a user
export const followUser = async (currentUserId, targetUserId, targetUsername) => {
  try {
    // Add to current user's following subcollection
    await setDoc(doc(db, 'users', currentUserId, 'following', targetUserId), {
      followedUserId: targetUserId,
      username: targetUsername,
      followedAt: serverTimestamp(),
    });

    // Add to target user's followers subcollection
    await setDoc(doc(db, 'users', targetUserId, 'followers', currentUserId), {
      followerId: currentUserId,
      followedAt: serverTimestamp(),
    });

    // Update counts
    await updateDoc(doc(db, 'users', currentUserId), {
      followingCount: increment(1),
    });

    await updateDoc(doc(db, 'users', targetUserId), {
      followersCount: increment(1),
    });
  } catch (error) {
    console.error('Follow user error:', error);
    throw error;
  }
};

// Unfollow a user
export const unfollowUser = async (currentUserId, targetUserId) => {
  try {
    // Remove from current user's following subcollection
    await deleteDoc(doc(db, 'users', currentUserId, 'following', targetUserId));

    // Remove from target user's followers subcollection
    await deleteDoc(doc(db, 'users', targetUserId, 'followers', currentUserId));

    // Update counts
    await updateDoc(doc(db, 'users', currentUserId), {
      followingCount: increment(-1),
    });

    await updateDoc(doc(db, 'users', targetUserId), {
      followersCount: increment(-1),
    });
  } catch (error) {
    console.error('Unfollow user error:', error);
    throw error;
  }
};

// Get followers list
export const getFollowers = async (userId) => {
  try {
    const followersRef = collection(db, 'users', userId, 'followers');
    const querySnapshot = await getDocs(followersRef);

    const followers = [];
    for (const docSnap of querySnapshot.docs) {
      // Handle both old (userId) and new (followerId) field names
      const followerId = docSnap.data().followerId || docSnap.data().userId;
      // Get follower's user data
      const userDoc = await getDoc(doc(db, 'users', followerId));
      if (userDoc.exists()) {
        followers.push({
          userId: followerId,
          ...userDoc.data(),
          followedAt: docSnap.data().followedAt,
        });
      }
    }

    return followers;
  } catch (error) {
    console.error('Get followers error:', error);
    throw error;
  }
};

// Get following list
export const getFollowing = async (userId) => {
  try {
    const followingRef = collection(db, 'users', userId, 'following');
    const querySnapshot = await getDocs(followingRef);

    const following = [];
    for (const docSnap of querySnapshot.docs) {
      // Handle both old (userId) and new (followedUserId) field names
      const followedUserId = docSnap.data().followedUserId || docSnap.data().userId;
      // Get followed user's data
      const userDoc = await getDoc(doc(db, 'users', followedUserId));
      if (userDoc.exists()) {
        following.push({
          userId: followedUserId,
          ...userDoc.data(),
          followedAt: docSnap.data().followedAt,
        });
      }
    }

    return following;
  } catch (error) {
    console.error('Get following error:', error);
    throw error;
  }
};

// Check if current user is following target user
export const isFollowing = async (currentUserId, targetUserId) => {
  try {
    const followDoc = await getDoc(
      doc(db, 'users', currentUserId, 'following', targetUserId)
    );
    return followDoc.exists();
  } catch (error) {
    console.error('Check following status error:', error);
    throw error;
  }
};
