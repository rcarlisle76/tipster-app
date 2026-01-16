import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  limit,
  serverTimestamp,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Create a new post
export const createPost = async (userId, username, content, imageUrl = '', taggedCompany = null) => {
  try {
    const postsRef = collection(db, 'posts');
    const postData = {
      userId,
      username,
      content,
      imageUrl,
      createdAt: serverTimestamp(),
      likesCount: 0,
      commentsCount: 0,
    };

    // Add tagged company if provided
    if (taggedCompany) {
      postData.taggedCompany = {
        userId: taggedCompany.userId,
        username: taggedCompany.username,
        displayName: taggedCompany.displayName || taggedCompany.username,
      };
    }

    const newPost = await addDoc(postsRef, postData);

    // Increment user's posts count
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      postsCount: increment(1),
    });

    return newPost.id;
  } catch (error) {
    console.error('Create post error:', error);
    throw error;
  }
};

// Get posts for a specific user
export const getUserPosts = async (userId) => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(
      postsRef,
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ postId: doc.id, ...doc.data() });
    });

    // Get unique tagged company IDs
    const taggedCompanyIds = [...new Set(
      posts
        .filter(post => post.taggedCompany && post.taggedCompany.userId)
        .map(post => post.taggedCompany.userId)
    )];

    // Fetch tagged company data in parallel if there are any
    if (taggedCompanyIds.length > 0) {
      const companyPromises = taggedCompanyIds.map(companyId =>
        getDoc(doc(db, 'users', companyId))
      );
      const companyDocs = await Promise.all(companyPromises);

      // Create a map of companyId -> accountType
      const companyDataMap = {};
      companyDocs.forEach((companyDoc, index) => {
        if (companyDoc.exists()) {
          companyDataMap[taggedCompanyIds[index]] = {
            accountType: companyDoc.data().accountType,
          };
        }
      });

      // Add accountType to tagged companies
      posts.forEach(post => {
        if (post.taggedCompany && post.taggedCompany.userId) {
          const companyData = companyDataMap[post.taggedCompany.userId] || {};
          post.taggedCompany.accountType = companyData.accountType || 'personal';
        }
      });
    }

    // Sort by createdAt in JavaScript (to avoid needing Firestore index)
    posts.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.seconds - a.createdAt.seconds;
    });

    return posts;
  } catch (error) {
    console.error('Get user posts error:', error);
    throw error;
  }
};

// Get recent posts (feed)
export const getFeedPosts = async (limitCount = 20) => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(
      postsRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const posts = [];

    querySnapshot.forEach((doc) => {
      posts.push({ postId: doc.id, ...doc.data() });
    });

    // Get unique user IDs
    const uniqueUserIds = [...new Set(posts.map(post => post.userId))];

    // Fetch all user profiles in parallel
    const userPromises = uniqueUserIds.map(userId =>
      getDoc(doc(db, 'users', userId))
    );
    const userDocs = await Promise.all(userPromises);

    // Create a map of userId -> user data
    const userDataMap = {};
    userDocs.forEach((userDoc, index) => {
      if (userDoc.exists()) {
        userDataMap[uniqueUserIds[index]] = {
          profilePicUrl: userDoc.data().profilePicUrl,
          accountType: userDoc.data().accountType,
        };
      }
    });

    // Add profile pics and account type to posts
    posts.forEach(post => {
      const userData = userDataMap[post.userId] || {};
      post.userProfilePic = userData.profilePicUrl || '';
      post.accountType = userData.accountType || 'personal';

      // Add accountType to tagged company if it exists
      if (post.taggedCompany && post.taggedCompany.userId) {
        const companyData = userDataMap[post.taggedCompany.userId] || {};
        post.taggedCompany.accountType = companyData.accountType || 'personal';
      }
    });

    return posts;
  } catch (error) {
    console.error('Get feed posts error:', error);
    throw error;
  }
};

// Get posts from users that the current user follows
export const getFollowingFeedPosts = async (userId) => {
  try {
    // First, get the list of users that this user follows
    const followingRef = collection(db, 'users', userId, 'following');
    const followingSnapshot = await getDocs(followingRef);

    const followingUserIds = [userId]; // Always include current user's posts

    // Add followed users
    followingSnapshot.forEach((doc) => {
      followingUserIds.push(doc.id);
    });

    // Get posts from all followed users (and current user)
    const postsRef = collection(db, 'posts');
    const q = query(
      postsRef,
      where('userId', 'in', followingUserIds)
    );

    const querySnapshot = await getDocs(q);
    const posts = [];

    querySnapshot.forEach((doc) => {
      posts.push({ postId: doc.id, ...doc.data() });
    });

    // Get unique user IDs
    const uniqueUserIds = [...new Set(posts.map(post => post.userId))];

    // Fetch all user profiles in parallel
    const userPromises = uniqueUserIds.map(uid =>
      getDoc(doc(db, 'users', uid))
    );
    const userDocs = await Promise.all(userPromises);

    // Create a map of userId -> user data
    const userDataMap = {};
    userDocs.forEach((userDoc, index) => {
      if (userDoc.exists()) {
        userDataMap[uniqueUserIds[index]] = {
          profilePicUrl: userDoc.data().profilePicUrl,
          accountType: userDoc.data().accountType,
        };
      }
    });

    // Add profile pics and account type to posts
    posts.forEach(post => {
      const userData = userDataMap[post.userId] || {};
      post.userProfilePic = userData.profilePicUrl || '';
      post.accountType = userData.accountType || 'personal';

      // Add accountType to tagged company if it exists
      if (post.taggedCompany && post.taggedCompany.userId) {
        const companyData = userDataMap[post.taggedCompany.userId] || {};
        post.taggedCompany.accountType = companyData.accountType || 'personal';
      }
    });

    // Sort by createdAt in JavaScript
    posts.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.seconds - a.createdAt.seconds;
    });

    return posts;
  } catch (error) {
    console.error('Get following feed posts error:', error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (postId, userId) => {
  try {
    await deleteDoc(doc(db, 'posts', postId));

    // Decrement user's posts count
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      postsCount: increment(-1),
    });
  } catch (error) {
    console.error('Delete post error:', error);
    throw error;
  }
};
