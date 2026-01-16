import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';

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

const userPosts = [
  {
    userId: 'vrR8Nb08CePP34MosDxfFpCqjAl1',
    username: 'alice_tips',
    posts: [
      'Best coffee spot in SF: Blue Bottle on Mint Plaza. Get the New Orleans iced coffee!',
      'Pro tip: Always negotiate your salary. I got a 15% increase just by asking!'
    ]
  },
  {
    userId: 'PTVquf9ruVUJBZF0Ua2bQCAKJik2',
    username: 'bob_traveler',
    posts: [
      'Hidden gem in Paris: Le Marais district. Skip the Eiffel Tower crowds and explore here instead.',
      'Travel hack: Book flights on Tuesday afternoons for the best deals!'
    ]
  },
  {
    userId: 'riUHf3OZb3MhNFgwYe101XQchIF3',
    username: 'carol_foodie',
    posts: [
      'The secret to perfect pasta: Save 1 cup of pasta water before draining. Game changer!',
      'Best tacos in LA: Leo\'s Tacos on La Brea. Order the al pastor. Trust me.'
    ]
  },
  {
    userId: '14d8wtVRQOVrLfZ5FAcBJl3l4YN2',
    username: 'david_tech',
    posts: [
      'Learning to code? Start with JavaScript, not Python. More job opportunities.',
      'Use dark mode everywhere. Your eyes will thank you after years of coding!'
    ]
  },
  {
    userId: 'DVHIGeULkeV29ciNg7oqBFF46he2',
    username: 'emma_fitness',
    posts: [
      'Morning workout tip: Drink water BEFORE coffee. Your body needs hydration first!',
      'Best gym in NYC: Equinox Dumbo. Amazing views while you sweat it out.'
    ]
  },
  {
    userId: '6JWVuciC89NPxYiIkwqCgsSDCZG3',
    username: 'frank_music',
    posts: [
      'Want to learn guitar? Practice 15 mins daily beats 2 hours once a week.',
      'Best headphones under $200: Sony WH-1000XM4. Worth every penny.'
    ]
  },
  {
    userId: 'yH5eWxWVYDZ1ks5ErVZTQT7pfVL2',
    username: 'grace_art',
    posts: [
      'Art supply tip: Cheap brushes are fine for practice. Invest in quality when you\'re ready.',
      'Free art classes at MOMA every Friday evening. Check their website!'
    ]
  },
  {
    userId: 'blyIH05nnaRxVFQDrZzjEaGesKH3',
    username: 'henry_coffee',
    posts: [
      'Cold brew secret: Coarse grind + 24hr steep = smoothest coffee ever.',
      'Skip Starbucks. Buy a French press for $20. Save thousands per year!'
    ]
  },
  {
    userId: 'fbmHvmbpbHd54vWi0xfdSg8Cpig2',
    username: 'iris_books',
    posts: [
      'Reading hack: Listen to audiobooks at 1.5x speed. Finish 50% more books!',
      'Best bookstore: The Strand in NYC. 18 miles of books. Heaven!'
    ]
  },
  {
    userId: 'HxAqFrLqH4c8Zcav0rxgNj546LN2',
    username: 'jack_sports',
    posts: [
      'Running tip: New shoes every 300-500 miles. Track it in your phone!',
      'Best basketball court in Chicago: The Cage at Wicker Park. Legends play here.'
    ]
  }
];

async function createSamplePosts() {
  console.log('Creating sample posts...\n');

  for (const userData of userPosts) {
    for (const postContent of userData.posts) {
      try {
        // Create post
        const postsRef = collection(db, 'posts');
        const newPost = await addDoc(postsRef, {
          userId: userData.userId,
          username: userData.username,
          content: postContent,
          imageUrl: '',
          createdAt: serverTimestamp(),
          likesCount: Math.floor(Math.random() * 50),
          commentsCount: Math.floor(Math.random() * 20)
        });

        // Increment user's posts count
        const userRef = doc(db, 'users', userData.userId);
        await updateDoc(userRef, {
          postsCount: increment(1)
        });

        console.log(`✅ Created post for ${userData.username}: "${postContent.substring(0, 50)}..."`);
      } catch (error) {
        console.error(`❌ Error creating post for ${userData.username}:`, error.message);
      }
    }
    console.log('');
  }

  console.log('✅ All sample posts created!');
}

createSamplePosts()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
