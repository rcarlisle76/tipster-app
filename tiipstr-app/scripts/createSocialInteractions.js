const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, setDoc, addDoc, updateDoc, increment, query, where } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyB5eqTms8VvkD1JTsR_zFmu5ZdTk-WOW0U",
  authDomain: "tiipstr-app.firebaseapp.com",
  projectId: "tiipstr-app",
  storageBucket: "tiipstr-app.firebasestorage.app",
  messagingSenderId: "363973819408",
  appId: "1:363973819408:web:08c204f729449a4de29e95",
  measurementId: "G-NPCH8JR03Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Comment templates for different post types
const commentTemplates = [
  'Amazing! 🔥',
  'Love this!',
  'So inspiring! ✨',
  'This is awesome!',
  'Great work!',
  'Keep it up! 💪',
  'Absolutely love this!',
  'This made my day!',
  'So good! 🙌',
  'Incredible!',
  'Beautiful! 😍',
  'Thanks for sharing!',
  'This is fire! 🔥',
  'Love the energy!',
  'Goals! 💯',
  'Can\'t get enough of this!',
  'Vibes! ✌️',
  'Obsessed with this!',
  'Such talent!',
  'You\'re killing it!',
  'Need more of this!',
  'Wow! Just wow!',
  'This hits different 🎯',
  'Pure gold! ⭐',
  'Legend! 🏆',
];

// Shuffle array helper
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Get random number between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createSocialInteractions() {
  console.log('🚀 Starting social interactions creation...\n');

  // 1. Get all users
  console.log('📋 Fetching all users...');
  const usersSnapshot = await getDocs(collection(db, 'users'));
  const users = [];
  usersSnapshot.forEach(doc => {
    users.push({ id: doc.id, ...doc.data() });
  });
  console.log(`✓ Found ${users.length} users\n`);

  // 2. Create follow relationships
  console.log('👥 Creating follow relationships...');
  let totalFollows = 0;

  for (const user of users) {
    // Each user will follow between 5-15 random other users
    const numToFollow = randomInt(5, 15);
    const otherUsers = users.filter(u => u.id !== user.id);
    const usersToFollow = shuffle(otherUsers).slice(0, numToFollow);

    for (const userToFollow of usersToFollow) {
      try {
        // Add to current user's following
        await setDoc(doc(db, 'users', user.id, 'following', userToFollow.id), {
          userId: userToFollow.id,
          username: userToFollow.username,
        });

        // Add to followed user's followers
        await setDoc(doc(db, 'users', userToFollow.id, 'followers', user.id), {
          userId: user.id,
          username: user.username,
        });

        // Update counts
        await updateDoc(doc(db, 'users', user.id), {
          followingCount: increment(1),
        });

        await updateDoc(doc(db, 'users', userToFollow.id), {
          followersCount: increment(1),
        });

        totalFollows++;
      } catch (error) {
        console.error(`Error creating follow relationship: ${error.message}`);
      }
    }

    console.log(`  ✓ ${user.username} now follows ${usersToFollow.length} users`);
  }

  console.log(`\n✅ Created ${totalFollows} total follow relationships\n`);

  // 3. Get all posts
  console.log('📝 Fetching all posts...');
  const postsSnapshot = await getDocs(collection(db, 'posts'));
  const posts = [];
  postsSnapshot.forEach(doc => {
    posts.push({ id: doc.id, ...doc.data() });
  });
  console.log(`✓ Found ${posts.length} posts\n`);

  // 4. Create comments on posts
  console.log('💬 Creating comments on posts...');
  let totalComments = 0;

  for (const user of users) {
    // Get list of users this person follows
    const followingSnapshot = await getDocs(collection(db, 'users', user.id, 'following'));
    const followingIds = [user.id]; // Include own posts
    followingSnapshot.forEach(doc => {
      followingIds.push(doc.id);
    });

    // Get posts from followed users
    const followedPosts = posts.filter(post => followingIds.includes(post.userId));

    if (followedPosts.length === 0) continue;

    // Comment on 20-40% of posts from followed users
    const numToComment = Math.floor(followedPosts.length * randomInt(20, 40) / 100);
    const postsToComment = shuffle(followedPosts).slice(0, numToComment);

    for (const post of postsToComment) {
      try {
        // Randomly decide if this post gets multiple comments from same user (10% chance)
        const numComments = Math.random() < 0.1 ? randomInt(2, 3) : 1;

        for (let i = 0; i < numComments; i++) {
          const comment = commentTemplates[randomInt(0, commentTemplates.length - 1)];

          await addDoc(collection(db, 'posts', post.id, 'comments'), {
            userId: user.id,
            username: user.username,
            comment,
            createdAt: new Date(),
          });

          // Update post comment count
          await updateDoc(doc(db, 'posts', post.id), {
            commentsCount: increment(1),
          });

          totalComments++;
        }
      } catch (error) {
        console.error(`Error creating comment: ${error.message}`);
      }
    }

    console.log(`  ✓ ${user.username} commented on ${postsToComment.length} posts`);
  }

  console.log(`\n✅ Created ${totalComments} total comments\n`);

  // 5. Create some random likes (simulate engagement)
  console.log('❤️ Creating post likes...');
  let totalLikes = 0;

  for (const user of users) {
    // Get list of users this person follows
    const followingSnapshot = await getDocs(collection(db, 'users', user.id, 'following'));
    const followingIds = [user.id];
    followingSnapshot.forEach(doc => {
      followingIds.push(doc.id);
    });

    // Get posts from followed users
    const followedPosts = posts.filter(post => followingIds.includes(post.userId));

    if (followedPosts.length === 0) continue;

    // Like 30-60% of posts from followed users
    const numToLike = Math.floor(followedPosts.length * randomInt(30, 60) / 100);
    const postsToLike = shuffle(followedPosts).slice(0, numToLike);

    for (const post of postsToLike) {
      try {
        await setDoc(doc(db, 'posts', post.id, 'likes', user.id), {
          userId: user.id,
          username: user.username,
        });

        // Update post like count
        await updateDoc(doc(db, 'posts', post.id), {
          likesCount: increment(1),
        });

        totalLikes++;
      } catch (error) {
        console.error(`Error creating like: ${error.message}`);
      }
    }

    console.log(`  ✓ ${user.username} liked ${postsToLike.length} posts`);
  }

  console.log(`\n✅ Created ${totalLikes} total likes\n`);

  console.log('🎉 Social interactions complete!');
  console.log(`\nSummary:`);
  console.log(`  - ${totalFollows} follow relationships`);
  console.log(`  - ${totalComments} comments`);
  console.log(`  - ${totalLikes} likes`);
}

createSocialInteractions()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Script error:', error);
    process.exit(1);
  });
