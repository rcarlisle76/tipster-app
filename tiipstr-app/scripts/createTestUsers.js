import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
const auth = getAuth(app);
const db = getFirestore(app);

const testUsers = [
  { username: 'alice_tips', email: 'alice@test.com', displayName: 'Alice Johnson' },
  { username: 'bob_traveler', email: 'bob@test.com', displayName: 'Bob Smith' },
  { username: 'carol_foodie', email: 'carol@test.com', displayName: 'Carol Davis' },
  { username: 'david_tech', email: 'david@test.com', displayName: 'David Wilson' },
  { username: 'emma_fitness', email: 'emma@test.com', displayName: 'Emma Brown' },
  { username: 'frank_music', email: 'frank@test.com', displayName: 'Frank Miller' },
  { username: 'grace_art', email: 'grace@test.com', displayName: 'Grace Taylor' },
  { username: 'henry_coffee', email: 'henry@test.com', displayName: 'Henry Anderson' },
  { username: 'iris_books', email: 'iris@test.com', displayName: 'Iris Martinez' },
  { username: 'jack_sports', email: 'jack@test.com', displayName: 'Jack Robinson' }
];

const password = 'Test123!';

async function createTestUsers() {
  console.log('Starting to create test users...\n');

  for (const userData of testUsers) {
    try {
      // Create authentication account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        password
      );

      const userId = userCredential.user.uid;
      console.log(`✅ Created auth account for ${userData.username} (${userId})`);

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', userId), {
        email: userData.email,
        username: userData.username,
        displayName: userData.displayName,
        bio: `Hi! I'm ${userData.displayName} and I love sharing tips!`,
        profilePicUrl: '',
        followersCount: 0,
        followingCount: 0,
        postsCount: 0,
        createdAt: new Date()
      });

      console.log(`✅ Created profile for ${userData.username}\n`);

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`⚠️  User ${userData.username} already exists, skipping...\n`);
      } else {
        console.error(`❌ Error creating ${userData.username}:`, error.message, '\n');
      }
    }
  }

  console.log('Finished creating test users!');
  console.log('\nTest user credentials:');
  console.log('Password for all users: Test123!');
  console.log('\nUsernames:');
  testUsers.forEach(user => {
    console.log(`  - ${user.username} (${user.email})`);
  });
}

createTestUsers()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
